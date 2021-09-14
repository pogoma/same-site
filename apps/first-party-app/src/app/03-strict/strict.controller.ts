import {Controller, Get, Header, HttpCode, Post, Response} from '@nestjs/common';
import {Response as Res} from 'express';
import {uuid} from 'uuidv4';
import {Cookies} from '../cookies.decorator';


/**
 * @see https://first-party-app:3333/03-strict/
 */
@Controller('/03-strict/')
export class StrictController {

  static readonly COOKIE_NAME: string = 'strict-session';

  @Get(['/', 'index.html'])
  @Header('Content-type', 'text/html')
  index(): string {
    // language=HTML
    return `
      <html>
      <head><title>[STRICT] First party</title></head>
      <body>
      <h1>First party app (SameSite=Strict)</h1>
      <div>
        <button onclick="fetch('login', {method: 'POST'})">login</button>
        <button onclick="fetch('logout', {method: 'POST'})">logout</button>
        <button
          onclick="fetch('session-id').then(function (data) { if(data.status == 200) data.json().then(function (j) {alert(j)}); if(data.status == 401) alert('unauthorized');})">
          get session id
        </button>
        <button
          onclick="fetch('do-some-stuff', {method: 'POST'}).then(function (data) { if(data.status == 200) alert('done'); if(data.status == 401) alert('unauthorized');})">
          do some stuff
        </button>
      </div>
      </body>
      </html>
    `
  }

  @Post('/login')
  @HttpCode(204)
  login(@Response() res: Res): Res {
    return res.set({'set-cookie': `${StrictController.COOKIE_NAME}=${uuid()}; SameSite=strict; Secure;`}).send()
  }

  @Post('/logout')
  @HttpCode(204)
  @Header('set-cookie', `${StrictController.COOKIE_NAME}=; expires=Thu, Jan 01 1970 00:00:00 UTC; SameSite=strict; Secure;`)
  logout(): void {
  }

  @Post('/do-some-stuff')
  @Header('Access-Control-Allow-Origin', 'https://third-party-app:3334')
  @Header('Access-Control-Allow-Credentials', 'true')
  doSomeStuff(@Cookies(StrictController.COOKIE_NAME) cookie: string, @Response() res: Res): Res {
    if (cookie) {
      return res.status(200).set('content-type', 'text/plain').send(`Done ${cookie}`);
    } else {
      return res.status(401).set('content-type', 'text/plain').send('Unauthorized');
    }
  }

  @Get('/session-id')
  @Header('Access-Control-Allow-Origin', 'https://third-party-app:3334')
  @Header('Access-Control-Allow-Credentials', 'true')
  sessionId(@Cookies(StrictController.COOKIE_NAME) cookie: string, @Response() res: Res): Res {
    if (cookie) {
      return res.status(200).set('content-type', 'text/plain').send(`"${cookie}"`);
    } else {
      return res.status(401).set('content-type', 'text/plain').send('Unauthorized');
    }
  }

}
