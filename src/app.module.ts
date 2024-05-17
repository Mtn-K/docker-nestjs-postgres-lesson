import { dataSourceOptions } from './../data-source';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
