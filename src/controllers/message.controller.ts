import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body, 
    ParseIntPipe 
  } from '@nestjs/common';
  import { MessageService } from 'src/services/message.service';
  import { Message } from 'src/models/message.model';
  
  @Controller('messages')
  export class MessageController {
    constructor(private readonly messageService: MessageService) {}
  
    @Post()
    async create(@Body() body: { content: string; userId: number }): Promise<{ data: Message }> {
      const message = await this.messageService.create(body);
      return { data: message };
    }
  
    @Get()
    async findAll(): Promise<{ data: Message[] }> {
      const messages = await this.messageService.findAll();
      return { data: messages };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<{ data: Message }> {
      const message = await this.messageService.findOne(id);
      return { data: message };
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: { content: string },
    ): Promise<{ data: Message }> {
      const message = await this.messageService.update(id, body);
      return { data: message };
    }
  
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
      await this.messageService.delete(id);
      return { data: `Mensagem com id ${id} foi deletada com sucesso.` };
    }
  }
  