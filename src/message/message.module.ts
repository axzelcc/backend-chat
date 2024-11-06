import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [PrismaModule, UserModule],
  exports: [MessageService],
})
export class MessageModule {}