import { IBasicPageContentRepository } from "@src/repositories";
import { BasicPageContent } from "@src/entities";
import { getConnection } from "typeorm";
import { metatagConvert } from '@src/Drupal/lib/MetatagConverter';

/*
SELECT 
	node.nid 
	,node.type
	,node.uuid
	,node_field_data.created
	,node_field_data.changed
	,node_field_data.promote
	,node_field_data.sticky
	,node_field_data.title
	,node__body.body_summary
	,node__body.body_value
	,amp_taxonomy.name AS hasAmp
  ,node__field_metatags.field_metatags_value as metatags
  ,url_alias.alias
FROM node
LEFT JOIN node__body ON 
	    node.nid = node__body.entity_id AND node.langcode = node__body.langcode
LEFT JOIN node_field_data ON 
	    node.nid = node_field_data.nid 
	AND node.langcode = node_field_data.langcode
LEFT JOIN node__field_amp_enabled ON 
		  node.nid = node__field_amp_enabled.entity_id 
	AND node.langcode = node__field_amp_enabled.langcode
LEFT JOIN taxonomy_term_field_data as amp_taxonomy ON 
	amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id
LEFT JOIN node__field_metatags ON 
	    node.nid = node__field_metatags.entity_id
  AND node.langcode = node__field_metatags.langcode
LEFT JOIN url_alias ON
      url_alias.source = concat('/node/', node.nid)
	AND node.langcode = url_alias.langcode  
*/

export class DrupalBasicPageContentRepository
  implements IBasicPageContentRepository {
  constructor(protected basicPageContentFactory) {}
  
  async getByUuid(uuid: string, langcode?: string): Promise<BasicPageContent> {
    const dbConnection = getConnection();
    let query = dbConnection.createQueryBuilder()
      .select('node.nid')
      .addSelect('node.uuid')
      .addSelect('node_field_data.created')
      .addSelect('node_field_data.changed')
      .addSelect('node_field_data.promote')
      .addSelect('node_field_data.sticky')
      .addSelect('node_field_data.title')
      .addSelect('node_field_data.langcode')
      .addSelect('node__body.body_summary')
      .addSelect('node__body.body_value')
      .addSelect('amp_taxonomy.name', 'hasAmp')
      .addSelect('node__field_metatags.field_metatags_value', 'metatags')
      .from('node', 'node')
      .leftJoinAndSelect('node_field_data', 'node_field_data', 'node.nid = node_field_data.nid AND node.langcode = node_field_data.langcode')
      .leftJoinAndSelect('node__body', 'node__body', 'node.nid = node__body.entity_id AND node_field_data.langcode = node__body.langcode')
      .leftJoinAndSelect('node__field_metatags', 'node__field_metatags', 'node.nid = node__field_metatags.entity_id AND node_field_data.langcode = node__field_metatags.langcode')
      .leftJoinAndSelect('node__field_amp_enabled', 'node__field_amp_enabled', 'node.nid = node__field_amp_enabled.entity_id AND node_field_data.langcode = node__field_amp_enabled.langcode')
      .leftJoinAndSelect('url_alias', 'url_alias', "url_alias.source = concat('/node/', node.nid) AND node_field_data.langcode = url_alias.langcode")
      .leftJoinAndSelect('taxonomy_term_field_data', 'amp_taxonomy', 'amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id')
      .where('uuid = :uuid', { uuid: uuid })

    const dbResult = await query.getRawOne();
    if (!dbResult) {
      return null
    }

    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();

    basicPageContent.uuid = dbResult.uuid;
    basicPageContent.uri = dbResult.alias;
    basicPageContent.createdAt = dbResult.created;
    basicPageContent.updatedAt = dbResult.changed;
    basicPageContent.promoted = dbResult.promote;
    basicPageContent.sticky = dbResult.sticky;
    basicPageContent.langcode = dbResult.langcode;
    basicPageContent.title = dbResult.title;
    basicPageContent.summary = dbResult.body_summary;
    basicPageContent.body = dbResult.body_value;
    basicPageContent.hasAmp = dbResult.hasAmp;
    basicPageContent.metatags = metatagConvert(dbResult.metatags);

    return basicPageContent;
  }

  async getByUuidSpecificLanguage(uuid: string, langcode: string): Promise<BasicPageContent> {
    const dbConnection = getConnection();
    let query = dbConnection.createQueryBuilder()
      .select('node.nid')
      .addSelect('node.uuid')
      .addSelect('node_field_data.created')
      .addSelect('node_field_data.changed')
      .addSelect('node_field_data.promote')
      .addSelect('node_field_data.sticky')
      .addSelect('node_field_data.title')
      .addSelect('node_field_data.langcode')
      .addSelect('node__body.body_summary')
      .addSelect('node__body.body_value')
      .addSelect('amp_taxonomy.name', 'hasAmp')
      .addSelect('node__field_metatags.field_metatags_value', 'metatags')
      .from('node', 'node')
      .leftJoinAndSelect('node_field_data', 'node_field_data', 'node.nid = node_field_data.nid AND node_field_data.langcode = :langcode', { langcode: langcode})
      .leftJoinAndSelect('node__body', 'node__body', 'node.nid = node__body.entity_id AND node_field_data.langcode = node__body.langcode')
      .leftJoinAndSelect('node__field_metatags', 'node__field_metatags', 'node.nid = node__field_metatags.entity_id AND node_field_data.langcode = node__field_metatags.langcode')
      .leftJoinAndSelect('node__field_amp_enabled', 'node__field_amp_enabled', 'node.nid = node__field_amp_enabled.entity_id AND node_field_data.langcode = node__field_amp_enabled.langcode')
      .leftJoinAndSelect('url_alias', 'url_alias', "url_alias.source = concat('/node/', node.nid) AND node_field_data.langcode = url_alias.langcode")
      .leftJoinAndSelect('taxonomy_term_field_data', 'amp_taxonomy', 'amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id')
      .where('uuid = :uuid', { uuid: uuid })

    const dbResult = await query.getRawOne();

    if (!dbResult) {
      return null
    }

    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    
    basicPageContent.uuid = dbResult.uuid;
    basicPageContent.uri = dbResult.alias;
    basicPageContent.createdAt = dbResult.created;
    basicPageContent.updatedAt = dbResult.changed;
    basicPageContent.promoted = dbResult.promote;
    basicPageContent.sticky = dbResult.sticky;
    basicPageContent.langcode = dbResult.langcode;
    basicPageContent.title = dbResult.title;
    basicPageContent.summary = dbResult.body_summary;
    basicPageContent.body = dbResult.body_value;
    basicPageContent.hasAmp = dbResult.hasAmp;
    basicPageContent.metatags = metatagConvert(dbResult.metatags);

    return basicPageContent;
  }
  async getByUri(uri: string, langcode: string): Promise<BasicPageContent> {
    const dbConnection = getConnection();
    let query = dbConnection.createQueryBuilder()
      .select('node.nid')
      .addSelect('node.uuid')
      .addSelect('node_field_data.created')
      .addSelect('node_field_data.changed')
      .addSelect('node_field_data.promote')
      .addSelect('node_field_data.sticky')
      .addSelect('node_field_data.title')
      .addSelect('node_field_data.langcode')
      .addSelect('node__body.body_summary')
      .addSelect('node__body.body_value')
      .addSelect('amp_taxonomy.name', 'hasAmp')
      .addSelect('node__field_metatags.field_metatags_value', 'metatags')
      .from('node', 'node')
      .leftJoinAndSelect('node_field_data', 'node_field_data', 'node.nid = node_field_data.nid AND node_field_data.langcode = :langcode', { langcode: langcode})
      .leftJoinAndSelect('node__body', 'node__body', 'node.nid = node__body.entity_id AND node_field_data.langcode = node__body.langcode')
      .leftJoinAndSelect('node__field_metatags', 'node__field_metatags', 'node.nid = node__field_metatags.entity_id AND node_field_data.langcode = node__field_metatags.langcode')
      .leftJoinAndSelect('node__field_amp_enabled', 'node__field_amp_enabled', 'node.nid = node__field_amp_enabled.entity_id AND node_field_data.langcode = node__field_amp_enabled.langcode')
      .leftJoinAndSelect('url_alias', 'url_alias', "url_alias.source = concat('/node/', node.nid) AND node_field_data.langcode = url_alias.langcode")
      .leftJoinAndSelect('taxonomy_term_field_data', 'amp_taxonomy', 'amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id')
      .where('alias = :uri', { uri: uri })

    const dbResult = await query.getRawOne();

    if (!dbResult) {
      return null
    }

    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    
    basicPageContent.uuid = dbResult.uuid;
    basicPageContent.uri = dbResult.alias;
    basicPageContent.createdAt = dbResult.created;
    basicPageContent.updatedAt = dbResult.changed;
    basicPageContent.promoted = dbResult.promote;
    basicPageContent.sticky = dbResult.sticky;
    basicPageContent.langcode = dbResult.langcode;
    basicPageContent.title = dbResult.title;
    basicPageContent.summary = dbResult.body_summary;
    basicPageContent.body = dbResult.body_value;
    basicPageContent.hasAmp = dbResult.hasAmp;
    basicPageContent.metatags = metatagConvert(dbResult.metatags);

    return basicPageContent;
  }



  /*
SELECT 
	node.nid 
	,node.type
	,node.uuid
	,node_field_data.created
	,node_field_data.changed
	,node_field_data.promote
	,node_field_data.sticky
	,node_field_data.title
	,node__body.langcode
	,node__body.body_summary
	,node__body.body_value
	,amp_taxonomy.name AS hasAmp
  ,node__field_metatags.field_metatags_value as metatags
  ,url_alias.alias
  FROM node
  LEFT JOIN node__body ON 
        node.nid = node__body.entity_id
  LEFT JOIN node_field_data ON 
        node.nid = node_field_data.nid 
    AND node__body.langcode = node_field_data.langcode
  LEFT JOIN node__field_amp_enabled ON 
        node.nid = node__field_amp_enabled.entity_id 
      AND node_field_data.langcode = node__field_amp_enabled.langcode
  LEFT JOIN node__field_metatags ON 
        node.nid = node__field_metatags.entity_id
    AND node_field_data.langcode = node__field_metatags.langcode
  LEFT JOIN url_alias ON
        url_alias.source = concat('/node/', node.nid)
        AND node_field_data.langcode = url_alias.langcode
  LEFT JOIN taxonomy_term_field_data as amp_taxonomy ON 
    amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id
      
   */

  async getLanguageVariations(uuid: string): Promise<BasicPageContent[]> {
    const dbConnection = getConnection();
    const basicPageContents = []
    const dbResults = await dbConnection.createQueryBuilder()
      .select('node.nid')
      .addSelect('node.uuid')
      .addSelect('node_field_data.created')
      .addSelect('node_field_data.changed')
      .addSelect('node_field_data.promote')
      .addSelect('node_field_data.sticky')
      .addSelect('node_field_data.title')
      .addSelect('node_field_data.langcode')
      .addSelect('node__body.body_summary')
      .addSelect('node__body.body_value')
      .addSelect('amp_taxonomy.name', 'hasAmp')
      .addSelect('node__field_metatags.field_metatags_value', 'metatags')
      .from('node', 'node')
      .leftJoinAndSelect('node_field_data', 'node_field_data', 'node.nid = node_field_data.nid')
      .leftJoinAndSelect('node__body', 'node__body', 'node.nid = node__body.entity_id AND node_field_data.langcode = node__body.langcode')
      .leftJoinAndSelect('node__field_metatags', 'node__field_metatags', 'node.nid = node__field_metatags.entity_id AND node_field_data.langcode = node__field_metatags.langcode')
      .leftJoinAndSelect('node__field_amp_enabled', 'node__field_amp_enabled', 'node.nid = node__field_amp_enabled.entity_id AND node_field_data.langcode = node__field_amp_enabled.langcode')
      .leftJoinAndSelect('url_alias', 'url_alias', "url_alias.source = concat('/node/', node.nid) AND node_field_data.langcode = url_alias.langcode")
      .leftJoinAndSelect('taxonomy_term_field_data', 'amp_taxonomy', 'amp_taxonomy.tid = node__field_amp_enabled.field_amp_enabled_target_id')
      .where('uuid = :uuid', { uuid: uuid })
      .getRawMany();

    if (!dbResults || dbResults.length === 0) {
      return null
    }
    for (let index = 0; index < dbResults.length; index++) {
      const dbResult = dbResults[index];
      const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    
      basicPageContent.uuid = dbResult.uuid;
      basicPageContent.uri = dbResult.alias;
      basicPageContent.createdAt = dbResult.created;
      basicPageContent.updatedAt = dbResult.changed;
      basicPageContent.promoted = dbResult.promote;
      basicPageContent.sticky = dbResult.sticky;
      basicPageContent.langcode = dbResult.langcode;
      basicPageContent.title = dbResult.title;
      basicPageContent.summary = dbResult.body_summary;
      basicPageContent.body = dbResult.body_value;
      basicPageContent.hasAmp = dbResult.hasAmp;
      basicPageContent.metatags = metatagConvert(dbResult.metatags);

      basicPageContents.push(basicPageContent)
    }

    return basicPageContents;
  }
}
