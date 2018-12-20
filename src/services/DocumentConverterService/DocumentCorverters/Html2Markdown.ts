import { IDocumentConverter } from '../DocumentConverterService';

export class Html2Markdown implements IDocumentConverter {
  protected turndownService
  constructor() {
    const TurndownService = require('turndown')
    this.turndownService = new TurndownService()
  }
  async convert(document: string): Promise<string> {
    return this.turndownService.turndown(document)
  }
}
