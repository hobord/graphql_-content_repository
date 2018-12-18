export type CategoryStructure = {
  uuid: string
  tid: number
  parentId: number
  parent: CategoryStructure
  group: string
  name: string
  langcode: string
  tanslationSource: string
  transaltions: CategoryStructure[]
  weight: number
  uri: string
};
