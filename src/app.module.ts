import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GateWayModule } from './websocket/websocket.module';


@Module({
  imports: [UserModule , GateWayModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
