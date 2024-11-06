import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  createUsers(data: User): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  getUserById(user: string, password: string): Promise<User> {   
    return this.prisma.user.findUnique({
      where: { user: user , password: password }
    })
  }

  getAllUseres(): Promise<User[]> {   
    return this.prisma.user.findMany();
  }
}
