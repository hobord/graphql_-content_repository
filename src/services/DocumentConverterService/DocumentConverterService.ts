export interface IDocumentConverter {
  convert(document: string): string
}

export class DocumentConverterService {
  protected converters: Map<string, IDocumentConverter> = new Map<string, IDocumentConverter>();

  addConverter(name: string, converter: IDocumentConverter) {
    this.converters.set(name, converter);
  }

  convert(document: string, toType: string): string {
    if (this.converters.has(toType)) {
      console.log(this.converters)
      return this.converters.get(toType).convert(document)
    }
    return document
  }
}
