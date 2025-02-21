import { IsString, MaxLength } from "class-validator";

export class MessageSchema {
    @IsString()
    @MaxLength(500)
    content: string;
}