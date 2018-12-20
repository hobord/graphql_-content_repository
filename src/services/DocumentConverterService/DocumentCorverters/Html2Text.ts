import { IDocumentConverter } from '../DocumentConverterService';
import  * as htmlToText from 'html-to-text';

export class Html2Text implements IDocumentConverter {
  async convert(document: string): Promise<string> {
    return htmlToText.fromString(document)
  }
}
