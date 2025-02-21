import { MessageController } from 'src/controllers/message.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message.model';
import { MessageService } from 'src/services/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
