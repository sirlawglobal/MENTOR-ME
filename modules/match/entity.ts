import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "../user/entity";

export enum MatchStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("matches")
export class Match {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: "mentorId" })
  mentor!: User;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: "menteeId" })
  mentee!: User;

  @Column({ type: "enum", enum: MatchStatus, default: MatchStatus.PENDING })
  status!: MatchStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
