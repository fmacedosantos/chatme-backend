import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { UserSchema } from 'src/schemas/user.schema';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
constructor(private readonly userService: UserService) {}

@Post()
public async create(@Body() body: UserSchema): Promise<{ data: User }> {
    const userCreated = await this.userService.create(body);
    return { data: userCreated };
}

@Get(':id')
public async getOne(@Param('id', ParseIntPipe) id: number): Promise<{ data: User }> {
    const user = await this.userService.findOne(id);
    return { data: user };
}

@Get()
public async getAll(): Promise<{ data: User[] }> {
    const list = await this.userService.findAll();
    return { data: list };
}

@UseGuards(JwtAuthGuard)
@Put(':id')
public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserSchema,
    @Req() req: RequestWithUser,
): Promise<{ data: User }> {
    const currentUserId = req.user.userId;
    const userUpdated = await this.userService.update(id, body, currentUserId);
    return { data: userUpdated };
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
public async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
): Promise<{ data: string }> {
    const currentUserId = req.user.userId;
    await this.userService.delete(id, currentUserId);
    return { data: `Usuário com id ${id} foi deletado com sucesso.` };
}
}