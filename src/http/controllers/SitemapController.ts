import { JsonController, Get, Param } from "routing-controllers";
import { Inject } from "typedi";
import { ISitemapService } from "@src/services";

@JsonController("/api/v1")
export class SitemapController {
  constructor(
    @Inject("SitemapService") protected sitemapService: ISitemapService
  ) {}

  @Get("/sitemap/:language")
  getSitemap(@Param("language") language: string) {
    return this.sitemapService.getSiteMap(language);
  }
}
