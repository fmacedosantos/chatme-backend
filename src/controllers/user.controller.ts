import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('/user')
export class UserController {

    @Post()
    public create(): any {
        return { data: 'Create !!!' };
    }

    @Get(':id')
    public getOne(): any {
        return { data: 'Get one !!!' };
    }

    @Get()
    public getAll(): any {
        return { data: 'Get all !!!' };
    }

    @Put(':id')
    public update(): any {
        return { data: 'Update !!!' };
    }

    @Delete(':id')
    public delete(): any {
        return { data: 'Delete !!!' };
    }
}