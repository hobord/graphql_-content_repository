import { Container } from "typedi";
import { MockBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/MockBasicPageContentRepository';
import { IBasicPageContentRepository } from '@src/repositories/BasicPageContentRepository/IBasicPageContentRepository';
import { BasicPageContentService } from './BasicPageContentService/BasicPageContentService';
import { BasicPageContentMockFactory, IBasicPageContentFactory } from '@src/entities';
import { MockSegmentationService, ISegmentationService } from './SegmentationService/SegmentationService';

/**
 * Instances creation
 */
const basicPageContentFactory: IBasicPageContentFactory = new BasicPageContentMockFactory()
const basicPageContentRepository: IBasicPageContentRepository = new MockBasicPageContentRepository(basicPageContentFactory);
const basicPageContentService: IBasicPageContentRepository =  new BasicPageContentService(basicPageContentRepository);
Container.set('BasicPageContentService', basicPageContentService);

const segmentationService: ISegmentationService = new MockSegmentationService();
Container.set('ISegmentationService', segmentationService);
