import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class HrefLang {
  @Field()
  langcode: string

  @Field()
  url?: string

  @Field()
  uri?: string
}
