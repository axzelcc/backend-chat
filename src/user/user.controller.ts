import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { BasicAuthGuard } from "src/auth/guard/basic-auth.guard";


@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @Post()
  async createUser(@Body() data:User) {
    return this.userService.createUsers(data);
  }

  @Post('login')
  async login(@Body() body: {user:string, password: string}){
    const {user, password} = body;
    
    const validUser = await this.userService.getUserById(user, password);

    if (!validUser) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Genera el Basic Auth en Base64
    const authHeader = this.createBasicAuthHeader(user, password);

    // Retorna el Authorization header
    return { authorization: `Basic ${authHeader}`, userId: validUser.id };
  }

  @Get(':user/:password')
  async getFindUser(@Param('user') user: string, @Param('password') password: string){
    return this.userService.getUserById(user, password);
  }

  @Get()
  @UseGuards(BasicAuthGuard) 
  async getAllUsers(){
    return this.userService.getAllUseres();
  }

  private createBasicAuthHeader(user: string, password: string): string {
    const credentials = `${user}:${password}`;
    return Buffer.from(credentials).toString('base64');
  }
  

}