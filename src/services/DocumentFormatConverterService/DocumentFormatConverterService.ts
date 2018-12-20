export interface IDocumentFormatConverter {
  convert(document: string): Promise<string>
}

export class DocumentFormatConverterService {
  protected converters: Map<string, IDocumentFormatConverter> = new Map<string, IDocumentFormatConverter>();

  addConverter(name: string, converter: IDocumentFormatConverter) {
    this.converters.set(name, converter);
  }

  async convert(document: string, toType: string): Promise<string> {
    if (this.converters.has(toType)) {
      return await this.converters.get(toType).convert(document)
    }
    return document
  }
}
