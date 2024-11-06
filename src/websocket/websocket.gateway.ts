
import { UseGuards } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { BasicAuthGuard } from "src/auth/guard/basic-auth.guard";
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
@UseGuards(BasicAuthGuard)
export class WebsocketGateway 
  implements OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server

    constructor(private readonly messagesService: MessageService ) {}

    handleConnection(client: Socket) {
      console.log(`CLient connecd: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
      console.log(`CLient disconnected: ${client.id}`);
    }

    @SubscribeMessage('mensaje')
    //handleMessage(@ConnectedSocket() client:Socket, @MessageBody() data: any){
    async handleMessage(@MessageBody() data: {
        id: number;
        createdAt: Date;
        content: string;
        userId: number;
    }){

      await this.messagesService.createMessage(data);
      console.log(data);
      this.server.emit('Mensaje', data);
      //client.broadcast.emit('Mensaje', data);
    }
}