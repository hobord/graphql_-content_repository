import { IDocumentFormatConverter } from '../DocumentFormatConverterService';
import  * as htmlToText from 'html-to-text';

export class Html2Text implements IDocumentFormatConverter {
  async convert(document: string): Promise<string> {
    return htmlToText.fromString(document)
  }
}
