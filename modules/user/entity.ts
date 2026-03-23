import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  MENTOR = "mentor",
  MENTEE = "mentee",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Index()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MENTEE,
  })
  role!: UserRole;

  @Column({ type: "text", nullable: true })
  bio!: string;

  @Column({ type: "simple-array", nullable: true })
  skills!: string[];

  @Column({ type: "simple-array", nullable: true })
  interests!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
