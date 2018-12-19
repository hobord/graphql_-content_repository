import { InputType, Field } from 'type-graphql';
import { ContextProperty as ContextProperty } from './ContextProperty';
import { IVisitorContext } from '@src/entities';


@InputType()
export class ContextInput {
  convertToHash(): IVisitorContext {
    let hash: IVisitorContext = {};

    for (let index = 0; index < this.properties.length; index++) {
      const property = this.properties[index];
      hash[property.name] = property.value
    }

    return hash
  }

  @Field(type => ContextProperty)
  properties: [ContextProperty]
}
