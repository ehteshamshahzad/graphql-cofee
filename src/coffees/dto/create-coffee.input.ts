import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCoffeeInput {
    @Field(() => String, { description: 'New coffee name' })
    name: string;
    brand: string;
    flavors: string[];
}
