import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee) private readonly coffeesRepository: Repository<Coffee>,
        @InjectRepository(Flavor) private readonly flavorsRepository: Repository<Flavor>
    ) { }

    async findAll() {
        return this.coffeesRepository.find(
            // { select: { id: true, name: true, brand: true, flavors: true }, relations: { flavors: true } }
        );
    }

    async findOne(id: number) {
        const coffee = await this.coffeesRepository.findOne({ where: { id } });
        if (!coffee) {
            // ⚠️ If you use the latest version of Apollo (>= v4), import "UserInputError" from "@nestjs/graphql"
            // Users that still depend on Apollo v3 can import this class from the "apollo-server-express" package
            throw new UserInputError(`Coffee #${id} does not exist`);
        }
        return coffee;
    }

    async create(createCoffeeInput: CreateCoffeeInput) {
        const flavors = await Promise.all(
            createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
        );
        const coffee = this.coffeesRepository.create({
            ...createCoffeeInput,
            flavors
        });
        return this.coffeesRepository.save(coffee);
    }

    async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
        const flavors =
            updateCoffeeInput.flavors && // 👈 new
            (await Promise.all(
                updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name)),
            ));
        const coffee = await this.coffeesRepository.preload({
            id,
            ...updateCoffeeInput,
            flavors,
        });
        if (!coffee) {
            throw new UserInputError(`Coffee #${id} does not exist`);
        }
        return this.coffeesRepository.save(coffee);
    }

    async delete(id: number) {
        const coffee = await this.findOne(id);
        return this.coffeesRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorsRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        // const [_, id] = await this.flavorsRepository.findAndCount({ select: { id: true } });
        return this.flavorsRepository.create({ name });
    }
}