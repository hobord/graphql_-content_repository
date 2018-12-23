import { Container } from "typedi";
// import { MockBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/MockBasicPageContentRepository';
import { IBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository';
import { BasicPageContentService, DocumentFormatConverterService } from './';
// BasicPageContentMockFactory,
import { IBasicPageContentFactory, BasicPageContentEmptyFactory } from '@src/entities';
import { MockSegmentationService, ISegmentationService } from './';
import { DrupalBasicPageContentRepository } from '@src/Drupal/repositories';
import { IDocumentFormatConverter } from './';
import { Html2Text } from './DocumentFormatConverterService/Corverters/Html2Text';
import { Html2Markdown } from './DocumentFormatConverterService/Corverters/Html2Markdown';

/**
 * BasicPageContentService
 */
// const basicPageContentFactory: IBasicPageContentFactory = new BasicPageContentMockFactory()
// const basicPageContentRepository: IBasicPageContentRepository = new MockBasicPageContentRepository(basicPageContentFactory);
const basicPageContentFactory: IBasicPageContentFactory = new BasicPageContentEmptyFactory()
const basicPageContentRepository: IBasicPageContentRepository = new DrupalBasicPageContentRepository(basicPageContentFactory);
const basicPageContentService: IBasicPageContentRepository =  new BasicPageContentService(basicPageContentRepository);
Container.set('BasicPageContentService', basicPageContentService);


/**
 * Segmentation service
 */
const segmentationService: ISegmentationService = new MockSegmentationService();
Container.set('SegmentationService', segmentationService);


/**
 * Document converters
 */
const converterService = new DocumentFormatConverterService();
const html2Text: IDocumentFormatConverter = new Html2Text();
converterService.addConverter('text',html2Text);
const html2Markdown: IDocumentFormatConverter = new Html2Markdown();
converterService.addConverter('markdown',html2Markdown);
converterService.addConverter('md',html2Markdown);
Container.set('DocumentConverterService', converterService);
