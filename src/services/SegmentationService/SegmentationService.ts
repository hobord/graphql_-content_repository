export interface ISegmentationService {
  contentSegmentation(document, context): string
}



export class MockSegmentationService implements ISegmentationService {
  contentSegmentation(document, context): string {
    
    return document
  }
}
