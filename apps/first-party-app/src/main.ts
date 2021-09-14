import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const fs = require('fs');
  const keyFile = fs.readFileSync(__dirname + '/assets/first-party-app-key.pem');
  const certFile = fs.readFileSync(__dirname + '/assets/first-party-app.pem');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }
  });
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.use(cookieParser());
  await app.listen(port, () => {
    Logger.log('Listening at https://first-party-app:' + port + '/' + globalPrefix);
  });
}

bootstrap();
