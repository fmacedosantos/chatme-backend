import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MessageService } from 'src/services/message.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
constructor(private readonly messageService: MessageService) {}

@Post()
async create(@Body() body: { content: string; userId: number }): Promise<{ data: any }> {
  const message = await this.messageService.create(body);
  const result = {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
    username: message.user.username,  
  };
  return { data: result };
}

@Get()
async findAll(): Promise<{ data: any[] }> {
  const messages = await this.messageService.findAll();
  const results = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt,
    username: msg.user.username,
  }));
  return { data: results };
}

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<{ data: any }> {
  const msg = await this.messageService.findOne(id);
  const result = {
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt,
    username: msg.user.username,
  };
  return { data: result };
}

@Put(':id')
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: { content: string },
): Promise<{ data: any }> {
  const msg = await this.messageService.update(id, body);
  const result = {
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt,
    username: msg.user.username,
  };
  return { data: result };
}

@Delete(':id')
async delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
  await this.messageService.delete(id);
  return { data: `Mensagem com id ${id} foi deletada com sucesso.` };
}
}
