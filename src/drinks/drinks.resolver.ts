import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { DrinkResultUnion } from 'src/common/unions/drinks-result.union';
import { Tea } from 'src/teas/tea.entity';

@Resolver()
export class DrinksResolver {

    @Query(() => [DrinkResultUnion], { name: 'Drinks' })
    async findAllDrinks(): Promise<typeof DrinkResultUnion[]> {
        const coffee = new Coffee();
        coffee.id = 1;
        coffee.name = 'Colombia';
        coffee.brand = 'Black Crow Coffee';

        const tea = new Tea();
        tea.name = 'Lipton';
        return [tea, coffee];
    }
}
