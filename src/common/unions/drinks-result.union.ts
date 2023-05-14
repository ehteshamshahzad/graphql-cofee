import { createUnionType } from "@nestjs/graphql";
import { Coffee } from "src/coffees/entities/coffee.entity";
import { Tea } from "src/teas/tea.entity";

export const DrinkResultUnion = createUnionType({
    name: 'DrinkResult',
    types: () => [Coffee, Tea]
});