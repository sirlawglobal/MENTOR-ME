import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/entity";

export enum SessionStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "mentorId" })
  mentor!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "menteeId" })
  mentee!: User;

  @Column({ type: "timestamp" })
  scheduledAt!: Date;

  @Column({
    type: "enum",
    enum: SessionStatus,
    default: SessionStatus.SCHEDULED,
  })
  status!: SessionStatus;

  @Column({ type: "text", nullable: true })
  meetingLink!: string;

  @Column({ type: "text", nullable: true })
  notes!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
