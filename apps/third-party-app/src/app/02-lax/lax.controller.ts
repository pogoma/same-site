import {Controller, Get, Header} from '@nestjs/common';

/**
 * @see https://third-party-app:3334/02-lax/
 */
@Controller('02-lax')
export class LaxController {

  static readonly FIRST_PARTY_APP_URL = 'https://first-party-app:3333/02-lax/';

  @Get(['/', 'index.html'])
  @Header('Content-type', 'text/html')
  index(): string {
    // language=HTML
    return `
      <html>
      <head><title>[LAX] Third party</title></head>
      <body>
      <h1>Third party app (SameSite=Lax)</h1>
      <p>
      <div>
        <div>Fetch</div>
        <button
          onclick="fetch('${LaxController.FIRST_PARTY_APP_URL}session-id', {credentials: 'include'}).then(function (data) { if(data.status == 200) data.json().then(function (j) {alert(j)}); if(data.status == 401) alert('unauthorized');})">
          get session id
        </button>
        <button
          onclick="fetch('${LaxController.FIRST_PARTY_APP_URL}do-some-stuff', {method: 'POST', credentials: 'include'}).then(function (data) { if(data.status == 200) alert('done'); if(data.status == 401) alert('unauthorized');})">
          do some stuff
        </button>
      </div>
      </p>
      <p>
      <div>
        Link
        <a href="${LaxController.FIRST_PARTY_APP_URL}session-id">${LaxController.FIRST_PARTY_APP_URL}session-id</a>
      </div>
      </p>
      <p>
      <div>
        Forms
        <form action="${LaxController.FIRST_PARTY_APP_URL}session-id" method="get">
          <button>get session id</button>
        </form>
        <form action="${LaxController.FIRST_PARTY_APP_URL}do-some-stuff" method="post">
          <button>do some stuff</button>
        </form>
      </div>
      </p>
      </body>
      </html>
    `
  }

}
