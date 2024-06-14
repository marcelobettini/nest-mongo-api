import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    RecipesModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.local', '.env'],
    }),

    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),

    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
