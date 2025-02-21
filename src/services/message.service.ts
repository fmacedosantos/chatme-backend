import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/message.model';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async create(body: { content: string; userId: number }): Promise<Message> {
    const message = this.messageRepo.create({
      content: body.content,
      user: { id: body.userId } as any,
    });
    return this.messageRepo.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepo.findOne({ where: { id }, relations: ['user'] });
    if (!message) {
      throw new NotFoundException(`Mensagem com id ${id} não encontrada.`);
    }
    return message;
  }

  async update(id: number, body: { content: string }): Promise<Message> {
    await this.messageRepo.update(id, { content: body.content });
    const updated = await this.findOne(id);
    return updated;
  }

  async delete(id: number): Promise<void> {
    const result = await this.messageRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mensagem com id ${id} não encontrada.`);
    }
  }
}
