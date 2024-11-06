import { Controller, Get, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { BasicAuthGuard } from "src/auth/guard/basic-auth.guard";

@Controller('message')
export class MessageController {

  constructor(private readonly messageService: MessageService) {}

  @Get()
  @UseGuards(BasicAuthGuard) 
  async getAllMessages(){
    return this.messageService.findAllMessages();
  }

}