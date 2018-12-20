import { BasicPageContent } from "@src/entities";

export interface IBasicPageContentRepository {
  getByUuid(uuid: string): Promise<BasicPageContent>;
  getByUuidSpecificLanguage(uuid: string, langcode: string): Promise<BasicPageContent>
  getLanguageVariations(uuid: string): Promise<BasicPageContent[]>;
}
