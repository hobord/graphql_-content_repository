require("module-alias/register");
import { expect } from "chai";
import * as faker from "faker";
import {
  IBasicPageContentRepository,
  MockBasicPageContentRepository
} from "./";
import {
  BasicPageContent,
  BasicPageContentMockFactory,
  IBasicPageContentFactory
} from "@src/entities";

describe("MockBasicPageContentRepository tests", () => {
  let repository: IBasicPageContentRepository = null;
  let factory: IBasicPageContentFactory = null;

  beforeEach(function() {
    factory = new BasicPageContentMockFactory();
    repository = new MockBasicPageContentRepository(factory);
  });

  it("uuid equal test", async () => {
    const uuid = faker.random.alphaNumeric(10);
    let content: BasicPageContent = await repository.getByUuid(uuid);
    expect(content.uuid).equal(uuid);
  });
  it("lang equal test", async () => {
    const uuid = faker.random.alphaNumeric(10);
    let content: BasicPageContent = await repository.getByUuidSpecificLanguage(uuid, 'en');
    expect(content.langcode).equal('en');
  });
});
