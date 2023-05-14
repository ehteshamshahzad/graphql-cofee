
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FlavorsByCoffeeLoader } from "./data-loader/flavors-by-coffee.loader";
import { Coffee } from "./entities/coffee.entity";
import { Flavor } from "./entities/flavor.entity";

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
    constructor(
        // @InjectRepository(Flavor) private readonly flavorsRepository: Repository<Flavor>
        private readonly flavorByCoffeeLoader: FlavorsByCoffeeLoader
    ) { }
    @ResolveField('flavors', () => [Flavor])
    async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
        // return this.flavorsRepository
        //     .createQueryBuilder('flavor')
        //     .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', {
        //         coffeeId: coffee.id,
        //     })
        //     .getMany();

        return this.flavorByCoffeeLoader.load(coffee.id);
    }
}


