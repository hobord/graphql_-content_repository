import { ISitemapRepository } from '@src/repositories/SitemapRepository';

export interface ISitemapService {
  getSiteMap(language: string)
}
export class SitemapService implements ISitemapService {
  constructor(protected sitemapRepository: ISitemapRepository) {}
  getSiteMap(language: string) {
    return this.sitemapRepository.getSiteMap(language);
  }
}
