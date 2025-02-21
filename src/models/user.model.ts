import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 255 
  })
  username: string;

  @Column({ 
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
