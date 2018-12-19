import { Resolver, Query, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { BasicPageContent } from "../types/BasicPageContent";
import { BasicPageContent as BasicPageContentEntity } from "@src/entities/BasicPageContent/BasicPageContent";
import { Container } from "typedi";
import { BasicPageContentService } from "@src/services/BasicPageContentService/BasicPageContentService";
import { ContextInput } from "../types/ContextInput";
import { IVisitorContext } from "@src/entities";
import { DocumentConverterService } from "@src/services/DocumentConverterService/DocumentConverterService";
import { ISegmentationService } from "@src/services/SegmentationService/SegmentationService";

@Resolver(of => BasicPageContent)
export class BasicPageContentResolver {
  constructor(
    protected basicPageContentService?: BasicPageContentService,
    protected converterService?: DocumentConverterService,
    protected segmentationService?: ISegmentationService
  ) {
    if (!basicPageContentService) {
      this.basicPageContentService = Container.get("BasicPageContentService");
    }
    if (!converterService) {
      this.converterService = Container.get("DocumentConverterService");
    }
    if (!segmentationService) {
      this.segmentationService = Container.get("SegmentationService");
    }
  }

  formatDocument(document: string, to, context?): string {
    if (context && context.visitorContext) {
      // make segmentation
      document = this.segmentationService.contentSegmentation(
        document,
        context.visitorContext
      );
    }

    document = this.converterService.convert(document, to);
    // document = "<p>" + document + "</p>";
    return document;
  }

  @Query(returns => BasicPageContent, { nullable: true })
  async getBasicPageContentByUuid(
    @Arg("uuid") uuid: string,
    @Arg("context", { nullable: true }) context: ContextInput,
    @Ctx() ctx: any
  ): Promise<BasicPageContent | undefined> {
    // if there is context argument we must to convert to hash key object format
    // and add to request context
    if (context) {
      const contextHash: IVisitorContext = context.convertToHash();
      ctx.visitorContext = contextHash;
    }

    // get content by uuid from the service (repository)
    const basicPageContentEntity: BasicPageContentEntity = await this.basicPageContentService.getByUuid(
      uuid
    );

    // create a response Object
    const basicPageContent = new BasicPageContent();

    // fill the response Object by entity
    basicPageContent.fillWithEntity(basicPageContentEntity);

    return basicPageContent;
  }

  @FieldResolver(type => String, { name: "getSummaryByFormat" })
  async getSummaryByFormat(
    @Root() basicPageContent: BasicPageContent,
    @Ctx() ctx: any, // http context
    @Arg("type", { nullable: true }) type?: string // required result format, aka html / plain text etc...
  ): Promise<string> {
    let document: string = basicPageContent.summary;

    // make segmentation
    document = this.segmentationService.contentSegmentation(
      document,
      ctx.visitorContext
    );

    // do the conversion
    document = this.formatDocument(document, type);

    return document;
  }

  @FieldResolver(type => String, { name: "getBodyByFormat" })
  async getBodyByFormat(
    @Root() basicPageContent: BasicPageContent,
    @Ctx() ctx: any, // http context
    @Arg("type", { nullable: true }) type?: string // required result format, aka html / plain text etc...
  ): Promise<string> {
    let document: string = basicPageContent.body;

    // make segmentation
    document = this.segmentationService.contentSegmentation(
      document,
      ctx.visitorContext
    );

    // do the conversion
    document = this.formatDocument(document, type);

    return document;
  }

  /**
   * get all language variations of this content
   * 
   * @param basicPageContent 
   */
  @FieldResolver(type => [BasicPageContent], { nullable: true })
  async languages(
    @Root() basicPageContent: BasicPageContent
  ): Promise<BasicPageContent[]> {
    const basicPageContents: BasicPageContent[] = []
    
    const basicPageContentEntities: BasicPageContentEntity[] = await this.basicPageContentService.getLanguageVariations(
      basicPageContent.uuid
    );
    
    for (let index = 0; index < basicPageContentEntities.length; index++) {
      const basicPageContentEntity = basicPageContentEntities[index];
      const basicPageContent = new BasicPageContent();
      basicPageContent.fillWithEntity(basicPageContentEntity);
      basicPageContents.push(basicPageContent);
    }

    return basicPageContents;
  }
}
