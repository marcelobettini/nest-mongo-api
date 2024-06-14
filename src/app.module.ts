import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    RecipesModule,
    /* MongooseModule.forRoot(
      'mongodb+srv://bettinimarcelo:0MoMQHiDOQtynXbo@nest-crud.50wvbao.mongodb.net/?retryWrites=true&w=majority&appName=nest-crud',
    ), */

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://bettinimarcelo:sAHRdnGcdfrU03RV@cluster0.ftoag2o.mongodb.net/recipesdb?retryWrites=true&w=majority&appName=Cluster0/recipes`,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
