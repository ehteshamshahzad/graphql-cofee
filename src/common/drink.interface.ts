import { Field, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class Drink {

    // Files with .interface in them are not detected by GraphQL CLI plugin by default. Hence, each field must be annotated with the @Feild() annotation.
    @Field()
    name: string;
}
