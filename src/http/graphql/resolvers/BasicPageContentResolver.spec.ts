require("module-alias/register");
import "reflect-metadata";
import { expect } from "chai";
import * as faker from "faker";
import {
  IBasicPageContentRepository,
  MockBasicPageContentRepository
} from "@src/repositories/BasicPageContentRepository";
import {
  BasicPageContentMockFactory,
  IBasicPageContentFactory
} from "@src/entities";
import { BasicPageContentResolver } from "./BasicPageContentResolver";
import { BasicPageContentService } from "@src/services/BasicPageContentService/BasicPageContentService";
import {
  DocumentConverterService,
  IDocumentConverter
} from "@src/services/DocumentConverterService/DocumentConverterService";
import {
  ISegmentationService,
  MockSegmentationService
} from "@src/services/SegmentationService/SegmentationService";

class MockConverter implements IDocumentConverter {
  convert(document: string): string {
    return document;
  }
}

describe("BasicPageContentResolver tests", () => {
  let repository: IBasicPageContentRepository;
  let factory: IBasicPageContentFactory;
  let basicPageContentService: BasicPageContentService;
  let resolver: BasicPageContentResolver;
  let converterService: DocumentConverterService;
  let mockConverter: MockConverter;
  let segmentationService: ISegmentationService;

  beforeEach(function() {
    factory = new BasicPageContentMockFactory();
    repository = new MockBasicPageContentRepository(factory);
    basicPageContentService = new BasicPageContentService(repository);

    converterService = new DocumentConverterService();
    mockConverter = new MockConverter();
    converterService.addConverter("mock", mockConverter);

    segmentationService = new MockSegmentationService();

    resolver = new BasicPageContentResolver(
      basicPageContentService,
      converterService,
      segmentationService
    );
  });

  it("formatDocument test with null context and converter", async () => {
    const document: string = faker.lorem.paragraphs(3);
    const result: string = resolver.formatDocument(document, null, null);
    expect(result).equal(document);
  });

  it("formatDocument test with null context and mock converter", async () => {
    const document: string = faker.lorem.paragraphs(3);
    const result: string = resolver.formatDocument(document, null, "mock");
    expect(result).equal(document);
  });
});
