import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffee } from './coffee.entity';

@Entity()
@ObjectType()
export class Flavor {

    // Manually overriding Field to be of type ID so GraphQL assigns it Int in the 'schema' file
    @Field(() => ID, { nullable: false, description: 'Unique ID' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Coffee, coffee => coffee.flavors /* inverse side */)
    coffees: Coffee[];

}
