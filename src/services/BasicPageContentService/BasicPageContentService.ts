import { BasicPageContent } from "@src/entities";
import { IBasicPageContentRepository } from "@src/repositories/BasicPageContentRepository/IBasicPageContentRepository";

export class BasicPageContentService {
  constructor(protected readonly repository: IBasicPageContentRepository) {}

  getByUuid(uuid: string): Promise<BasicPageContent> {
    // check the cache

    // get the content from repository
    const content = this.repository.getByUuid(uuid);

    // save to cache

    return content;
  }

  getByUuidSpecificLanguage(
    uuid: string,
    langcode: string
  ): Promise<BasicPageContent> {
    // check the cache

    // get the content from repository
    const content = this.repository.getByUuidSpecificLanguage(uuid, langcode);

    // save to cache

    return content;
  }

  getByUri(
    uri: string,
    langcode: string
  ): Promise<BasicPageContent> {
    // check the cache

    // get the content from repository
    const content = this.repository.getByUri(uri, langcode);

    // save to cache

    return content;
  }

  getLanguageVariations(uuid: string): Promise<BasicPageContent[]> {
    // check the cache

    // get the content from repository
    const contents = this.repository.getLanguageVariations(uuid);

    // save to cache

    return contents;
  }
}
