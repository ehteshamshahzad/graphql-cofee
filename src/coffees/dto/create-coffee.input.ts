// .input.ts file is similat to .dto.ts
import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { CoffeeType } from "src/common/enum/coffee-type.enum";

// @InputType: to insure this is automatically generated for us in our schema file
@InputType()
export class CreateCoffeeInput {
    id: number;
    @MinLength(3)
    @Field(() => String, { description: 'New coffee name' })
    name: string;
    brand: string;
    flavors: string[];
    type: CoffeeType;
}
