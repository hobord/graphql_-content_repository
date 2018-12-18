import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Metatag {

  @Field()
  name: string

  @Field()
  value: string
}
