import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine('hbs', hbs.engine(
    {
       extname: 'hbs',
       partialsDir: join(__dirname, '..', 'views/partials'),
       defaultLayout: 'layout',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      }));
  app.setViewEngine('hbs');




  // app.setBaseViewsDir(join(__dirname, '..', 'views/layout'));
  // app.setViewEngine('hbs');
  // app.setLocal('view options', { layout: 'layout' });
  // hbs.registerPartials(join(__dirname, "..", "/views/partials"));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
