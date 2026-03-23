import { AppDataSource, initializeDb } from "@/lib/db";
import { Match, MatchStatus } from "./entity";
import { User } from "../user/entity";

export async function getMatchesByUserId(userId: string) {
  await initializeDb();
  const matchRepo = AppDataSource.getRepository(Match);

  return await matchRepo.find({
    where: [
      { mentor: { id: userId } },
      { mentee: { id: userId } }
    ],
    relations: ["mentor", "mentee"],
    order: { createdAt: "DESC" }
  });
}

export async function createMatch(menteeId: string, mentorId: string) {
  await initializeDb();
  const matchRepo = AppDataSource.getRepository(Match);
  const userRepo = AppDataSource.getRepository(User);

  const mentee = await userRepo.findOneBy({ id: menteeId });
  const mentor = await userRepo.findOneBy({ id: mentorId });

  if (!mentee || !mentor) {
    throw new Error("User not found");
  }

  const existing = await matchRepo.findOne({
    where: {
      mentee: { id: menteeId },
      mentor: { id: mentorId }
    }
  });

  if (existing) {
    throw new Error("Match request already exists");
  }

  const match = matchRepo.create({
    mentee,
    mentor,
    status: MatchStatus.PENDING
  });

  return await matchRepo.save(match);
}

export async function updateMatchStatus(matchId: string, status: MatchStatus) {
  await initializeDb();
  const matchRepo = AppDataSource.getRepository(Match);

  const match = await matchRepo.findOneBy({ id: matchId });
  if (!match) throw new Error("Match not found");

  match.status = status;
  return await matchRepo.save(match);
}

export async function getPendingMatchesByMentorId(mentorId: string) {
  await initializeDb();
  const matchRepo = AppDataSource.getRepository(Match);

  return await matchRepo.find({
    where: {
      mentor: { id: mentorId },
      status: MatchStatus.PENDING
    },
    relations: ["mentee"]
  });
}

export async function getMatchStats(userId: string) {
  await initializeDb();
  const matchRepo = AppDataSource.getRepository(Match);

  const matches = await matchRepo.find({
    where: [
      { mentor: { id: userId } },
      { mentee: { id: userId } }
    ]
  });

  return {
    total: matches.length,
    active: matches.filter(m => m.status === MatchStatus.ACTIVE).length,
    pending: matches.filter(m => m.status === MatchStatus.PENDING).length
  };
}
