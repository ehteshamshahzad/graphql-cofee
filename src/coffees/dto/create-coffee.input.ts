import { Field, InputType } from "@nestjs/graphql";

// .input.ts file is similat to .dto.ts
@InputType()
export class CreateCoffeeInput {
    @Field(() => String, { description: 'New coffee name' })
    name: string;
    brand: string;
    flavors: string[];
}
