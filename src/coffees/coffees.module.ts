import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver, FlavorsByCoffeeLoader]
})
export class CoffeesModule { }
