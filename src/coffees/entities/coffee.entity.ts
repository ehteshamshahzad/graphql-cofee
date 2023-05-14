import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Drink } from 'src/common/drink.interface';
import { CoffeeType } from 'src/common/enum/coffee-type.enum';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
@ObjectType({ description: 'Coffee model', implements: () => Drink })
export class Coffee implements Drink {

    // Manually overriding Field to be of type ID so GraphQL assigns it Int in the 'schema' file
    @Field(() => ID, { nullable: false, description: 'Unique ID' })
    @PrimaryColumn()
    id: number;

    @Column()
    @Field({ middleware: [loggerMiddleware] })
    name: string;

    @Column()
    @Field({ middleware: [loggerMiddleware] })
    brand: string;

    // @Column({ type: 'json' })
    // A better approach is to create a coffee_flavor class, and have a one to many relation with it.
    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, { cascade: true } /* inverse side */,)
    flavors?: Flavor[];

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    type: CoffeeType;
}
