import { Module } from "@nestjs/common";
import { BasicAuthGuard } from "./guard/basic-auth.guard";

@Module({
  controllers: [],
  providers: [BasicAuthGuard],
  exports: [BasicAuthGuard],
})
export class AuthModule {}