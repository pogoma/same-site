/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';

async function bootstrap() {
  const fs = require('fs');
  const keyFile = fs.readFileSync(__dirname + '/assets/third-party-app-key.pem');
  const certFile = fs.readFileSync(__dirname + '/assets/third-party-app.pem');

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }
  });
  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3334;
  await app.listen(port, () => {
    Logger.log('Listening at https://third-party-app:' + port + '/' + globalPrefix);
  });
}

bootstrap();
