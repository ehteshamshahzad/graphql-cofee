import { ObjectType } from "@nestjs/graphql";
import { Drink } from "src/common/drink.interface";

@ObjectType({ implements: () => Drink })
export class Tea implements Drink {
    name: string;
}
