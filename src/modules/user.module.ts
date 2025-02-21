import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/models/user.model";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
})
export class UserModule {}