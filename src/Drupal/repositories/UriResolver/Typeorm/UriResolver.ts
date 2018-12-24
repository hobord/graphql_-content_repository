import { getConnection } from "typeorm";

export class UriResolver {
  constructor() {

  }

  async getContentByUriLang(uri: string, language: string) {
    const dbConnection = getConnection();
    let source: string = uri
    const nodeRe = /^\/(node)\/(\d*)/gm;
    const taxonomyRe = /^\/(taxonomy)\/term\/(\d*)/gm;

    // SELECT source FROM alias WHERE alias = :alias AND langcode = :language
    let query = dbConnection.createQueryBuilder() 
    .select('url_alias.source')
    .from('url_alias', 'url_alias')
    .where('alias = :alias', { alias: uri })
    .where('langcode = :langcode', { langcode: language })
    
    const dbResult = await query.getRawOne();
    
    if (dbResult) {
      source = dbResult.source
    }
    
    // It is a node?
    const nodeMatch = nodeRe.exec(source)
    if(nodeMatch && nodeMatch.length === 3) {
      return {
        type: 'node',
        nid: nodeMatch[2]
      }
    }

    // It is a taxonomy term page?
    const taxonomyMatch = taxonomyRe.exec(source)
    if(taxonomyMatch && taxonomyMatch.length === 3) {
      return {
        type: 'taxonomy',
        tid: taxonomyMatch[2]
      }
    }

    // We didn't found
    return {
      type: 'unknown'
    }

  }
}
