import { Resolver, Query, Arg, FieldResolver, Root, Ctx } from "type-graphql";
import { BasicPageContent } from "../types/BasicPageContent";
import { BasicPageContent as BasicPageContentEntity } from "@src/entities/BasicPageContent/BasicPageContent";
import { Container } from "typedi";
import { BasicPageContentService } from "@src/services/BasicPageContentService/BasicPageContentService";
import { ContextInput } from "../types/ContextInput";
import { Context } from "@src/entities";

@Resolver(of => BasicPageContent)
export class BasicPageContentResolver {
  private basicPageContentService: BasicPageContentService;

  constructor() {
    this.basicPageContentService = Container.get("BasicPageContentService");
  }

  formatDocument(document: string, context, type): string {
    if (context.visitorContext) {
      // make segmentation
      //console.log(context.visitorContext);
      //document = segmentationService.contentSegmentation(document, context.visitorContext)
    }

    if (type) {
      // get the converter
      //converter = converterService.getConverter(type)
      //if(converter) {
      //  document = converter.convert(document)
      //}
      document = "<p>" + document + "</p>";
    }
    return document;
  }

  @Query(returns => BasicPageContent, { nullable: true })
  async getBasicPageContentByUuid(
    @Arg("uuid") uuid: string,
    @Arg("context", { nullable: true }) context: ContextInput,
    @Ctx() ctx: any
  ): Promise<BasicPageContent | undefined> {
    if (context) {
      const contextHash: Context = context.convertToHash();
      ctx.visitorContext = contextHash;
    }

    const basicPageContentEntity: BasicPageContentEntity = await this.basicPageContentService.getByUuid(
      uuid
    );

    const basicPageContent = new BasicPageContent();

    basicPageContent.fillWithEntity(basicPageContentEntity);

    return basicPageContent;
  }

  @FieldResolver(type => String, { name: "getSummaryByFormat" })
  async getSummaryByFormat(
    @Root() basicPageContent: BasicPageContent,
    @Ctx() ctx: any,
    @Arg("type", { nullable: true }) type?: string
  ): Promise<string> {

    return this.formatDocument(basicPageContent.summary, ctx, type)
  }

  @FieldResolver(type => String, { name: "getBodyByFormat" })
  async getBodyByFormat(
    @Root() basicPageContent: BasicPageContent,
    @Ctx() ctx: any,
    @Arg("type", { nullable: true }) type?: string
  ): Promise<string> {

    return  this.formatDocument(basicPageContent.body, ctx, type)
  }
}
