import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType() // Marks the class as a GraphQL Object Type
export class Employee {
  @Field(() => ID) // GraphQL ID type
  id: string;

  @Field() // GraphQL String type
  name: string;

  @Field(() => Int) // GraphQL Integer type
  age: number;

  @Field() // GraphQL String type
  class: string;

  @Field(() => [String]) // GraphQL List of Strings
  subjects: string[];

  @Field(() => Int, { nullable: true }) // Nullable GraphQL Integer type
  attendance?: number;
}
