import {
  HrefLangStructure,
  GuideChapterStructure,
  MetatagStructure,
  ImageStructure,
  ContentTextStructure,
  ArticleStructure
} from "./";

export type AuthorStructure = {
  uuid: number;
  nid: number;
  type: string;
  template: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  promoted: Boolean;
  sticky: Boolean;
  hasAmp: Boolean;
  langcode: string;

  uri: string;
  hrefLangs: HrefLangStructure[];
  metatags: MetatagStructure[];

  name: string;
  coverImage: ImageStructure;
  summary: ContentTextStructure;
  body: ContentTextStructure;
  authorContent: (ArticleStructure|GuideChapterStructure)[];
  articles: ArticleStructure[];
  guideChapters: GuideChapterStructure[];
};
