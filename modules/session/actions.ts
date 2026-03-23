"use server";

import { revalidatePath } from "next/cache";
import { createMentorshipSession, updateSessionStatus } from "./service";
import { getSession } from "@/lib/auth/session";
import { SessionStatus } from "./entity";

export async function scheduleSessionAction(partnerId: string, date: string, title: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    const scheduledAt = new Date(date);
    // For simplicity, we assume the person initiating is either mentor or mentee
    // The service handles verifying the active match
    await createMentorshipSession(session.userId, partnerId, scheduledAt, title);
    revalidatePath("/sessions");
    revalidatePath("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function completeSessionAction(sessionId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    await updateSessionStatus(sessionId, SessionStatus.COMPLETED);
    revalidatePath("/sessions");
    revalidatePath("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function cancelSessionAction(sessionId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    await updateSessionStatus(sessionId, SessionStatus.CANCELLED);
    revalidatePath("/sessions");
    revalidatePath("/dashboard");
  } catch (err: any) {
    return { error: err.message };
  }
}
