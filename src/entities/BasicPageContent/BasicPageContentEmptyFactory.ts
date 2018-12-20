import { BasicPageContent } from "@src/entities";

export class BasicPageContentEmptyFactory {
  constructor() {}
  create(): BasicPageContent {
    const hrefLangs = [];
    const metatags = []
    const segmentedBy = []

    return new BasicPageContent({
      segmentedBy: segmentedBy,
      hrefLangs: hrefLangs,
      metatags: metatags,
    });
  }
}
