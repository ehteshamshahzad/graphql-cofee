import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Coffee {

    // Manually overriding Field to be of type ID so GraphQL assigns it Int in the 'schema' file
    @Field(() => ID, { nullable: false, description: 'Unique ID' })
    id: number;
    name: string;
    brand: string;
    flavors: string[];
}
