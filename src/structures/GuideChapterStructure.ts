import {
  HrefLangStructure,
  MetatagStructure,
  ContentTextStructure,
  ImageStructure,
  AuthorStructure,
  CategoryStructure,
  GuideStructure
} from "./";

export type GuideChapterStructure = {
  uuid: string;
  nid: number;
  type: string;
  template: string;
  status: number;
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

  leadText: ContentTextStructure;
  summary: ContentTextStructure;
  coverImage: ImageStructure[];
  body: ContentTextStructure;

  publishedAt: string;
  author: AuthorStructure;
  guide: GuideStructure;
  chapters: GuideChapterStructure[];
  categories: CategoryStructure[];
  tags: CategoryStructure[];
};
