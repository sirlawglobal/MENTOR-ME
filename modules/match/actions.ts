"use server";

import { revalidatePath } from "next/cache";
import { createMatch, updateMatchStatus } from "./service";
import { getSession } from "@/lib/auth/session";
import { MatchStatus } from "./entity";

export async function requestMatchAction(mentorId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    await createMatch(session.userId, mentorId);
    revalidatePath("/matches");
    revalidatePath("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function respondToMatchAction(matchId: string, accept: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    const status = accept ? MatchStatus.ACTIVE : MatchStatus.CANCELLED;
    await updateMatchStatus(matchId, status);
    revalidatePath("/matches");
    revalidatePath("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}
