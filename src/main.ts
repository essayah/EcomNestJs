import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Ecommerce Application')
  .setDescription('API de Mon premiere applicaton Nest')
  .setVersion('1.0')
  .addTag('Ecom')
  .build(); 

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('EcomApp/api', app, document);
 
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
