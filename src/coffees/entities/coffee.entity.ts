import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
@ObjectType()
export class Coffee {

    // Manually overriding Field to be of type ID so GraphQL assigns it Int in the 'schema' file
    @Field(() => ID, { nullable: false, description: 'Unique ID' })
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    // @Column({ type: 'json' })
    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, { cascade: true } /* inverse side */,)
    flavors?: Flavor[];
}
