import { InputType, Field, Int } from 'type-graphql';
import { IsString, IsInt, Min, Max, IsArray, ArrayNotEmpty } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @Field()
  @IsString()
  class: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  subjects: string[];

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  @Min(0)
  @Max(100)
  attendance: number;
}
