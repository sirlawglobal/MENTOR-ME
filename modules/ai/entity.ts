import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../user/entity";

@Entity("recommendations")
export class Recommendation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "menteeId" })
  mentee!: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "mentorId" })
  recommendedMentor!: User;

  @Column({ type: "float", nullable: true })
  matchScore!: number;

  @Column({ type: "text", nullable: true })
  reason!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
