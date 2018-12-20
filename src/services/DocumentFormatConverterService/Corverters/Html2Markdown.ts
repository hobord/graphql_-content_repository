import { IDocumentFormatConverter } from '../DocumentFormatConverterService';

export class Html2Markdown implements IDocumentFormatConverter {
  protected turndownService
  constructor() {
    const TurndownService = require('turndown')
    this.turndownService = new TurndownService()
  }
  async convert(document: string): Promise<string> {
    return this.turndownService.turndown(document)
  }
}
