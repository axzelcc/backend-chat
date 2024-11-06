import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as basicAuth from 'basic-auth';
import { UserService } from 'src/user/user.service';
import { Socket } from 'socket.io'

@Injectable()
export class BasicAuthGuard implements CanActivate {
  
  constructor(private readonly userService: UserService) {}

  async canActivate( context: ExecutionContext ):Promise<boolean> {

    const isWs = context.getType() === 'ws';
    
    if (isWs) {
      const client: Socket = context.switchToWs().getClient();
      const authHeader = client.handshake.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        client.disconnect();
        throw new UnauthorizedException('Missing credentials 1');
      }
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');
      const [name, pass] = credentials;

      if (!name || !pass) {
        client.disconnect();
        throw new UnauthorizedException('Invalid credentials 2');
      }

      const user = await this.userService.getUserById(name, pass);
      if (!user) {
        client.disconnect();
        throw new UnauthorizedException('Invalid credentials');
      }

      return true;

    } else {

      const request = context.switchToHttp().getRequest();
      const credentials = basicAuth(request); 

      if (!credentials || !credentials.name || !credentials.pass) {
        throw new UnauthorizedException('Missing credentials');
      }
      
      const user = await this.userService.getUserById(credentials.name, credentials.pass);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      
      return true;

    }

  }
}
