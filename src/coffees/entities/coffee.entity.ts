import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Coffee {

    @Field(() => ID, { nullable: false, description: 'Unique ID' })
    id: number;
    name: string;
    brand: string;
    flavors: string[];
}
