// import { Container } from "typedi";
// import { Resolver, Query, Arg, FieldResolver, Root, Ctx } from "type-graphql";
// import { BasicPageContentService } from "@src/services";
// import { DocumentFormatConverterService } from "@src/services";
// import { ISegmentationService } from "@src/services";
// import { BasicPageContent } from "../types/BasicPageContent";
// import { ContextInput } from "../types/ContextInput";
// // import { BasicPageContent as BasicPageContentEntity } from "@src/entities";
// // import { IVisitorContext } from "@src/entities";

// @Resolver(of => BasicPageContent)
// export class classPageResolver {
//   constructor(
//     protected basicPageContentService?: BasicPageContentService,
//     protected converterService?: DocumentFormatConverterService,
//     protected segmentationService?: ISegmentationService
//   ) {
//     if (!basicPageContentService) {
//       this.basicPageContentService = Container.get("BasicPageContentService");
//     }
//     if (!converterService) {
//       this.converterService = Container.get("DocumentConverterService");
//     }
//     if (!segmentationService) {
//       this.segmentationService = Container.get("SegmentationService");
//     }
//   }
  
//   @Query(returns => BasicPageContent, { nullable: true })
//   getPageByURI(
//     @Ctx() ctx: any,
//     @Arg("uri") uri: string,
//     @Arg("language", { nullable: true }) language: string,
//     @Arg("context", { nullable: true }) context?: ContextInput
//     ) {

//   }

// }
