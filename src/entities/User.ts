import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Token } from "./Token";

export enum UserRoles {
  USER = "USER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", select: false })
  password: string;

  @Column({ type: "text", array: true, unique: true, select: false })
  roles: string[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
