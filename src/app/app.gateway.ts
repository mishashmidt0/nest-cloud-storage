import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { ChatEntity } from 'src/app/entities/chat.entity';
import { ForbiddenException } from '@nestjs/common';

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
  async handleSendMessage(client: Socket, payload: ChatEntity): Promise<void> {
    try {
      await this.appService.createMessage(payload);
      this.server.emit(`recMessage-${payload.roomId}`, JSON.stringify(payload));
    } catch (e) {
      throw new ForbiddenException(e);
    }
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
    console.log(args);
    console.log(`Connected ${client.id}`);
    //Выполняем действия
  }
}
