import { InputType, Field } from 'type-graphql';


@InputType()
export class ContextProperty {
  @Field()
  name: string;

  @Field()
  value: string;
}
