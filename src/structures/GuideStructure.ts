import {
  HrefLangStructure,
  MetatagStructure,
  ContentTextStructure,
  ImageStructure,
  AuthorStructure,
  CategoryStructure,
  GuideChapterStructure
} from "./";

export type GuideStructure = {
  uuid: number
  nid: number
  type: string
  template: string

  title: string
  createdAt: string
  updatedAt: string
  promoted: Boolean
  sticky: Boolean
  hasAmp: Boolean
  langcode: string

  uri: string
  hrefLangs: HrefLangStructure[]

  metatags: MetatagStructure[]

  leadText: ContentTextStructure
  summary: ContentTextStructure
  coverImage: ImageStructure
  body: ContentTextStructure
  chapters: GuideChapterStructure[]

  publishedAt: string
  author: AuthorStructure
  categories: CategoryStructure
  tags: CategoryStructure[]
}
