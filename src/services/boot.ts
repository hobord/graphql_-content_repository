import { Container } from "typedi";
// import { MockBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/MockBasicPageContentRepository';
import { IBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/IBasicPageContentRepository';
import { BasicPageContentService, DocumentConverterService } from './';
// BasicPageContentMockFactory,
import { IBasicPageContentFactory, BasicPageContentEmptyFactory } from '@src/entities';
import { MockSegmentationService, ISegmentationService } from './';
import { DrupalBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/TypeormDrupal/DrupalBasicPageContentRepository';

/**
 * Instances creation
 */
// const basicPageContentFactory: IBasicPageContentFactory = new BasicPageContentMockFactory()
const basicPageContentFactory: IBasicPageContentFactory = new BasicPageContentEmptyFactory()
// const basicPageContentRepository: IBasicPageContentRepository = new MockBasicPageContentRepository(basicPageContentFactory);
const basicPageContentRepository: IBasicPageContentRepository = new DrupalBasicPageContentRepository(basicPageContentFactory);
const basicPageContentService: IBasicPageContentRepository =  new BasicPageContentService(basicPageContentRepository);
Container.set('BasicPageContentService', basicPageContentService);

const segmentationService: ISegmentationService = new MockSegmentationService();
Container.set('SegmentationService', segmentationService);

const converterService = new DocumentConverterService();
Container.set('DocumentConverterService', converterService);
