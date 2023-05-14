import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { DateScalar } from './common/scalars/date.scalar';
import { Tea } from './teas/tea.entity';
import { DrinksResolver } from './drinks/drinks.resolver';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-28.railway.app',
      port: 6169,
      username: 'postgres',
      password: 'LoSbon1ECe0uQsI8zzwo',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      /*
      * Using join so instead of saving scheme in memory we are saving it in a director to make sure graphQL types look as expected
      */
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // buildSchemaOptions: {
      //   numberScalarMode: 'integer'
      // }
      buildSchemaOptions: {
        numberScalarMode: 'integer',
        dateScalarMode: 'timestamp',
        orphanedTypes: [Tea]
      }
    }),
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar, DrinksResolver],
})
export class AppModule { }
