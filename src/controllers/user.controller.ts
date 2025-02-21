import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.model";
import { UserSchema } from "src/schemas/user.schema";
import { Repository } from "typeorm";

@Controller('/user')
export class UserController {
    constructor(
        @InjectRepository(User) private model: Repository<User>,
    ) {}

    @Post()
    public async create(@Body() body: UserSchema): Promise<{ data: User }> {
        const userCreated = await this.model.save(body);
        return { data: userCreated };
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<{ data: User }> {
        const user = await this.model.findOne({ where: { id }});

        if (!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }

        return { data: user };
    }

    @Get()
    public async getAll(): Promise<{ data: User[] }> {
        const list = await this.model.find();
        return { data: list };
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserSchema): Promise<{ data: User | null }> {
        const user = await this.model.findOne({ where: { id }});

        if (!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }

        await this.model.update({ id }, body);

        const userUpdated = await this.model.findOne({ where: { id }});

        return { data: userUpdated };
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> {
        const user = await this.model.findOne({ where: { id }});

        if (!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
        }

        await this.model.delete(id);

        return { data: `Usuário com id ${id} foi deletado com sucesso.` };
    }
}