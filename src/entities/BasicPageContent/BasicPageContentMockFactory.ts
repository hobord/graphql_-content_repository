import { BasicPageContent } from "@src/entities";
import * as faker from "faker";

export class BasicPageContentMockFactory {
  constructor() {}
  create(): BasicPageContent {
    const hrefLangs = [];
    const metatags = []
    const segmentedBy = []

    hrefLangs.push({
      langcode: faker.random.alphaNumeric(2),
      uri: faker.random.alphaNumeric(30)
    });
    hrefLangs.push({
      langcode: faker.random.alphaNumeric(2),
      uri: faker.random.alphaNumeric(30)
    });

    metatags.push({
      name: faker.random.alphaNumeric(5),
      value: faker.random.words(3),
    });
    metatags.push({
      name: faker.random.alphaNumeric(5),
      value: faker.random.words(3),
    });

    segmentedBy.push('ftd')

    return new BasicPageContent({
      uuid: faker.random.alphaNumeric(10),
      segmentedBy: segmentedBy,
      title: faker.random.words(5),
      template: faker.random.word(),
      createdAt: faker.date.recent().toUTCString(),
      updatedAt: faker.date.recent().toUTCString(),
      promoted: faker.random.boolean(),
      sticky: faker.random.boolean(),
      hasAmp: faker.random.boolean(),
      langcode: faker.random.alphaNumeric(2),
      uri: faker.random.alphaNumeric(30),
      hrefLangs: hrefLangs,
      metatags: metatags,
      summary: faker.lorem.paragraphs(1),
      body: faker.lorem.paragraphs(3)
    });
  }
}
