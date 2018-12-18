import { BasicPageContent } from '@src/entities';
import { IBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/IBasicPageContentRepository';

export class BasicPageContentService {
  constructor(protected readonly repository: IBasicPageContentRepository) {}

  getByUuid(uuid: string): Promise<BasicPageContent> {
    // check the cache
    
    // get the content from repository
    const content = this.repository.getByUuid(uuid)
    
    // save to cache

    return content
  }
}
