export interface IDocumentConverter {
  convert(document: string): Promise<string>
}

export class DocumentConverterService {
  protected converters: Map<string, IDocumentConverter> = new Map<string, IDocumentConverter>();

  addConverter(name: string, converter: IDocumentConverter) {
    this.converters.set(name, converter);
  }

  async convert(document: string, toType: string): Promise<string> {
    if (this.converters.has(toType)) {
      return await this.converters.get(toType).convert(document)
    }
    return document
  }
}
