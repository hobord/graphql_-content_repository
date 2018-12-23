import { ObjectType, Field } from 'type-graphql';
import { HrefLang } from './HrefLang';
import { Metatag } from './Metatag';
import { BasicPageContent as Entity } from '@src/entities'

@ObjectType({ description: "Object representing an BasicPageContent" })
export class BasicPageContent { //  implements IPage 

  constructor(data?: Partial<BasicPageContent>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  fillWithEntity(entity: Entity): void {
    Object.assign(this, entity)
  }

  @Field()
  uuid: string;

  @Field()
  layout?: string

  @Field()
  template?: string

  @Field()
  createdAt: string
  
  @Field()
  updatedAt: string
  
  @Field()
  promoted: Boolean
  
  @Field()
  sticky: Boolean
  
  @Field()
  hasAmp: Boolean
  
  @Field()
  langcode: string

  @Field()
  uri: string;

  @Field(type => [HrefLang], { nullable: true })
  hrefLangs: HrefLang[]

  // @Field(type => [BasicPageContent], { nullable: true })
  // languages: [BasicPageContent]

  @Field(type => [Metatag])
  metatags: Metatag[]

  @Field()
  title: string
  
  @Field()
  summary: string
  
  @Field()
  body: string;

}
