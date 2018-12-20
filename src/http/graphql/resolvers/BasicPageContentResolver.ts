import { Container } from "typedi";
import { Resolver, Query, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { BasicPageContentService } from "@src/services";
import { DocumentConverterService } from "@src/services";
import { ISegmentationService } from "@src/services";
import { BasicPageContent } from "../types/BasicPageContent";
import { ContextInput } from "../types/ContextInput";
import { BasicPageContent as BasicPageContentEntity } from "@src/entities";
import { IVisitorContext } from "@src/entities";

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

  async formatDocument(document: string, to, context?): Promise<string> {
    // make segmentation
    if (context && context.visitorContext) {
      document = this.segmentationService.contentSegmentation(
        document,
        context.visitorContext
      );
    }

    // make document format conversion
    document = await this.converterService.convert(document, to);

    return document;
  }

  @Query(returns => BasicPageContent, { nullable: true })
  async getBasicPageContentByUuid(
    @Ctx() ctx: any,
    @Arg("uuid") uuid: string,
    @Arg("language", { nullable: true }) language?: string,
    @Arg("context", { nullable: true }) context?: ContextInput
  ): Promise<BasicPageContent | undefined> {
    // if there is context argument we must to convert to hash key object format
    // and add to request context
    if (context) {
      const contextHash: IVisitorContext = context.convertToHash();
      ctx.visitorContext = contextHash;
    }

    // get content by uuid from the service (repository)
    let basicPageContentEntity: BasicPageContentEntity
    if (language) {
      basicPageContentEntity = await this.basicPageContentService.getByUuidSpecificLanguage(
        uuid,
        language
      );
    } else {
      basicPageContentEntity = await this.basicPageContentService.getByUuid(
        uuid
      );
    }

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
    document = await this.formatDocument(document, type);

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
    document = await this.formatDocument(document, type);

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
    const basicPageContents: BasicPageContent[] = [];

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
