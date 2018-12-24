import { getConnection, Brackets } from "typeorm";


export class SiteMapRepository {
  constructor() {}

  private createSitemapRecord(dbRecord) {
    return {
      uuid: dbRecord.uuid,
      uri: dbRecord.alias,
      language: dbRecord.langcode,
      type: (dbRecord.type === 'node') ? 'content':'content_list',
      contentType: dbRecord.node_type,
      template: dbRecord.template || 'default',
      changed: dbRecord.changed ? new Date(parseInt(dbRecord.changed)*1000).toISOString() : null,
      catalog: dbRecord.vid
    }
  }

  private makeSiteMap(dbResults, language) {
    const resultSitemap = new Map<string, object>();
    const aliases = new Map<string, any>(); 
    // Get the requested language aliases 
    for (let index = 0; index < dbResults.length; index++) {
      const dbResult = dbResults[index];
      if (dbResult.langcode === language) {
        let mapItem = {
          loc: this.createSitemapRecord(dbResult)
        }
        mapItem[dbResult.langcode] = this.createSitemapRecord(dbResult)
        aliases.set(dbResult.uuid, mapItem);
        resultSitemap.set(dbResult.alias, mapItem);
      }
    }

    // Look again the array for alternatives languages
    for (let index = 0; index < dbResults.length; index++) {
      const dbResult = dbResults[index];
      if (dbResult.langcode !== language) {
        let mapItem = aliases.get(dbResult.uuid)
        if (mapItem) {
          mapItem[dbResult.langcode] = this.createSitemapRecord(dbResult)
          resultSitemap.set(mapItem.loc.uri, mapItem);
        }
      }
    }
    return resultSitemap;
  }

  async getSiteMap(language: string) {
    const dbConnection = getConnection();

    let query = dbConnection.createQueryBuilder() 
    .select('url_alias.alias', 'alias')
    .addSelect('url_alias.langcode', 'langcode')
    .addSelect('node_field_data.changed', 'changed')
    .addSelect("if(node.nid, 'node', 'category')", 'type')
    .addSelect("if(node.nid, node.uuid, taxonomy_term_data.uuid)", 'uuid')
    .addSelect("if(node.nid, node.nid, taxonomy_term_data.tid)", 'id')
    .addSelect("node_field_data.type", 'node_type')
    .addSelect("taxonomy_term_data.vid", 'vid')
    .from('url_alias', 'url_alias')
    .leftJoinAndSelect('node', 'node', "concat('/node/', node.nid) = source")
    .leftJoinAndSelect('node_field_data', 'node_field_data', "node_field_data.nid = node.nid AND node_field_data.langcode = url_alias.langcode")
    .leftJoinAndSelect('taxonomy_term_data', 'taxonomy_term_data', "concat('/taxonomy/term/', taxonomy_term_data.tid) = source AND url_alias.langcode = taxonomy_term_data.langcode")
    .leftJoinAndSelect('taxonomy_term_field_data', 'taxonomy_term_field_data', "taxonomy_term_field_data.tid = taxonomy_term_data.tid AND taxonomy_term_field_data.langcode = taxonomy_term_data.langcode")
    .where('node_field_data.status = 1')
    .orWhere('taxonomy_term_field_data.status = 1')

    const dbResults = await query.getRawMany()

    return this.makeSiteMap(dbResults, language)
  }

  async getSpecificUriData(uri: string, language: string) {
    const dbConnection = getConnection();

    let query = dbConnection.createQueryBuilder() 
    .select('url_alias.alias', 'alias')
    .addSelect('url_alias.langcode', 'langcode')
    .addSelect('node_field_data.changed', 'changed')
    .addSelect("if(node.nid, 'node', 'category')", 'type')
    .addSelect("if(node.nid, node.uuid, taxonomy_term_data.uuid)", 'uuid')
    .addSelect("if(node.nid, node.nid, taxonomy_term_data.tid)", 'id')
    .addSelect("node_field_data.type", 'node_type')
    .addSelect("taxonomy_term_data.vid", 'vid')
    .from('url_alias', 'url_alias')
    .leftJoinAndSelect('node', 'node', "concat('/node/', node.nid) = source")
    .leftJoinAndSelect('node_field_data', 'node_field_data', "node_field_data.nid = node.nid AND node_field_data.langcode = url_alias.langcode")
    .leftJoinAndSelect('taxonomy_term_data', 'taxonomy_term_data', "concat('/taxonomy/term/', taxonomy_term_data.tid) = source AND url_alias.langcode = taxonomy_term_data.langcode")
    .leftJoinAndSelect('taxonomy_term_field_data', 'taxonomy_term_field_data', "taxonomy_term_field_data.tid = taxonomy_term_data.tid AND taxonomy_term_field_data.langcode = taxonomy_term_data.langcode")
    .where('url_alias.alias = :uri', { uri: uri })
    .andWhere(new Brackets(qb => {
      qb.where('node_field_data.status = 1')
        .orWhere('taxonomy_term_field_data.status = 1')
    }));

    const dbResults = await query.getRawMany();

    return this.makeSiteMap(dbResults, language)
  }
}
