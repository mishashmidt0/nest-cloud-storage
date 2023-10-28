import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect, MessageBody, ConnectedSocket
} from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { ChatEntity } from './entities/chat.entity';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private appService: AppService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    console.log(payload);
    await this.appService.createMessage({ createdAt: new Date(), text: payload ,email:'test@coms.er', id:1 });

    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
    //Выполняем действия
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Выполняем действия
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Выполняем действия
  }
}