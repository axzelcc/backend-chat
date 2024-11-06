
import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { UserModule } from "src/user/user.module";
import { MessageModule } from "src/message/message.module";

@Module({
  imports: [UserModule, MessageModule],
  providers: [WebsocketGateway],
})
export class GateWayModule {}
