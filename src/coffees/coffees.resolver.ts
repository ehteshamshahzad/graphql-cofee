import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';

// A resolver is similar to a controller
@Resolver()
export class CoffeesResolver {

    constructor(private readonly coffeesService: CoffeesService) { }

    @Query(() => [Coffee], { name: 'coffees' })
    async findAll() {
        return await this.coffeesService.findAll();
    }

    // @Args to pass arguments
    // ParseIntPipe: takes a 'string' and parses it to an 'int'
    // @Query is similar to GET request
    @Query(() => Coffee, { name: 'coffee' })
    async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
        return await this.coffeesService.findOne(id);
    }

    // @Mutation is used for POST/PUT/PATCH/Delete requests
    @Mutation(() => Coffee, { name: 'createCoffee' })
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
        return await this.coffeesService.create(createCoffeeInput);
    }

    @Mutation(() => Coffee, { name: 'updateCoffee' })
    async update(@Args('id', { type: () => ID }, ParseIntPipe) id: number, @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput) {
        return await this.coffeesService.update(id, updateCoffeeInput);
    }

    @Mutation(() => Coffee, { name: 'deleteCoffee', nullable: true })
    async delete(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
        return await this.coffeesService.delete(id);
    }
}

