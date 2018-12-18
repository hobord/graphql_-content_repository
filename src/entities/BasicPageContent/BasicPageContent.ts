import { HrefLangEntity } from '../HrefLangEntity';
import { Metatag } from '../Metatag';

export class BasicPageContent {
  constructor(data?: Partial<BasicPageContent>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  uuid: string;

  segmentedBy: string[]

  template?: string

  createdAt?: string
  
  updatedAt?: string
  
  promoted?: Boolean
  
  sticky?: Boolean
  
  hasAmp?: Boolean
  
  langcode?: string

  uri?: string;

  hrefLangs?: HrefLangEntity[]

  metatags?: Metatag[]

  title: string
  
  summary?: string
  
  body?: string
}
