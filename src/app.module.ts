import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { Message } from './models/message.model';
import { MessageModule } from './modules/message.module';
import { AuthModule } from './modules/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, 
      entities: [User, Message],
      synchronize: true, 
    }),
    UserModule,
    MessageModule,
    AuthModule,
  ],
})
export class AppModule {}
