import {Module} from '@nestjs/common';

import {NoneController} from './01-none/none.controller';
import {LaxController} from './02-lax/lax.controller';
import {StrictController} from './03-strict/strict.controller';

@Module({
  imports: [],
  controllers: [NoneController, LaxController, StrictController],
  providers: [],
})
export class AppModule {
}
