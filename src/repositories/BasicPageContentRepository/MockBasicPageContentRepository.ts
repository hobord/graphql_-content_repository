import { IBasicPageContentRepository } from "./IBasicPageContentRepository";
import { BasicPageContent } from "@src/entities";

export class MockBasicPageContentRepository
  implements IBasicPageContentRepository {
  constructor(protected basicPageContentFactory) {}
  
  async getByUuid(uuid: string): Promise<BasicPageContent> {
    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    basicPageContent.uuid = uuid;
    return basicPageContent;
  }
  async getByUuidSpecificLanguage(uuid: string, langcode: string): Promise<BasicPageContent> {
    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    basicPageContent.uuid = uuid;
    basicPageContent.langcode = langcode
    return basicPageContent;
  }
  async getByUri(uri: string, langcode: string): Promise<BasicPageContent> {
    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    basicPageContent.uri = uri;
    basicPageContent.langcode = langcode
    return basicPageContent;
  }
  async getLanguageVariations(uuid: string): Promise<BasicPageContent[]> {
    const basicPageContent: BasicPageContent = this.basicPageContentFactory.create();
    return [basicPageContent];
  }
}
