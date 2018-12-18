import {
  HrefLangStructure,
  MetatagStructure,
  ContentTextStructure,
  ImageStructure,
  AuthorStructure,
  CategoryStructure
} from "./";


export type ArticleStructure = {
  uuid?: string;
  nid?: number;
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

  leadText: ContentTextStructure;
  summary: ContentTextStructure;
  coverImage: ImageStructure;
  body: ContentTextStructure;

  publishedAt: string;
  author: AuthorStructure;
  categories: CategoryStructure[];
  tags: CategoryStructure[];
};
