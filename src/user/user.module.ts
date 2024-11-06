import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}