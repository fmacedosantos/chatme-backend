import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(body: UserSchema): Promise<User> {
    body.password = await bcrypt.hash(body.password, Number(process.env.SALT_ROUNDS))
    return await this.userRepo.save(body);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async update(id: number, body: UserSchema, currentUserId: number): Promise<User> {
    if (id !== currentUserId) {
      throw new ForbiddenException('Você não pode atualizar a conta de outro usuário.');
    }
    await this.findOne(id);
    await this.userRepo.update({ id }, body);
    return await this.findOne(id);
  }

  async delete(id: number, currentUserId: number): Promise<void> {
    if (id !== currentUserId) {
      throw new ForbiddenException('Você não pode excluir a conta de outro usuário.');
    }
    await this.findOne(id);
    await this.userRepo.delete(id);
  }
}
