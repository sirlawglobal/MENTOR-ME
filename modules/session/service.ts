import { AppDataSource, initializeDb } from "@/lib/db";
import { Session, SessionStatus } from "./entity";
import { User } from "../user/entity";
import { Match, MatchStatus } from "../match/entity";

export async function createMentorshipSession(mentorId: string, menteeId: string, scheduledAt: Date, title: string) {
  await initializeDb();
  const sessionRepo = AppDataSource.getRepository(Session);
  const userRepo = AppDataSource.getRepository(User);
  const matchRepo = AppDataSource.getRepository(Match);

  // Verify they have an active match
  const match = await matchRepo.findOne({
    where: [
      { mentor: { id: mentorId }, mentee: { id: menteeId }, status: MatchStatus.ACTIVE },
      { mentor: { id: menteeId }, mentee: { id: mentorId }, status: MatchStatus.ACTIVE }
    ]
  });

  if (!match) {
    throw new Error("You must have an active match to schedule a session");
  }

  // Check if either participant already has a session at this exact time
  const overlapping = await sessionRepo.findOne({
    where: [
      { mentor: { id: mentorId }, scheduledAt, status: SessionStatus.SCHEDULED },
      { mentee: { id: mentorId }, scheduledAt, status: SessionStatus.SCHEDULED },
      { mentor: { id: menteeId }, scheduledAt, status: SessionStatus.SCHEDULED },
      { mentee: { id: menteeId }, scheduledAt, status: SessionStatus.SCHEDULED }
    ]
  });

  if (overlapping) {
    throw new Error("One of the participants already has a session scheduled for this exact time slot.");
  }

  const mentor = await userRepo.findOneBy({ id: mentorId });
  const mentee = await userRepo.findOneBy({ id: menteeId });

  if (!mentor || !mentee) throw new Error("User not found");

  const session = sessionRepo.create({
    mentor,
    mentee,
    scheduledAt,
    status: SessionStatus.SCHEDULED,
    meetingLink: `https://meet.jit.si/mentor-me-${Math.random().toString(36).substring(7)}`
  });

  return await sessionRepo.save(session);
}

export async function getSessionsByUserId(userId: string) {
  await initializeDb();
  const sessionRepo = AppDataSource.getRepository(Session);
  
  return await sessionRepo.find({
    where: [
      { mentor: { id: userId } },
      { mentee: { id: userId } }
    ],
    relations: ["mentor", "mentee"],
    order: { scheduledAt: "ASC" }
  });
}

export async function updateSessionStatus(sessionId: string, status: SessionStatus) {
  await initializeDb();
  const sessionRepo = AppDataSource.getRepository(Session);
  
  const session = await sessionRepo.findOneBy({ id: sessionId });
  if (!session) throw new Error("Session not found");
  
  session.status = status;
  return await sessionRepo.save(session);
}

export async function getUpcomingSessionCount(userId: string) {
  await initializeDb();
  const sessionRepo = AppDataSource.getRepository(Session);
  
  return await sessionRepo.count({
    where: [
      { mentor: { id: userId }, status: SessionStatus.SCHEDULED },
      { mentee: { id: userId }, status: SessionStatus.SCHEDULED }
    ]
  });
}
