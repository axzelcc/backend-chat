import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { Message } from "@prisma/client";

@Injectable()
export class MessageService {

  constructor(private prisma: PrismaService) {}

  createMessage(data: Message): Promise<Message> {
    return this.prisma.message.create({
      data
    });
  }

  findAllMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

}