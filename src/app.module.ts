import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';

import { Product } from './entity/product.entity';
import { Category } from './entity/category.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nestjsdb",
      entities: [Product ,Category],
      "synchronize": true, 
      "logging":true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
