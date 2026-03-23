"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { updateUser } from "./service";

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const bio = formData.get("bio") as string;
  const skillsString = formData.get("skills") as string;
  const interestsString = formData.get("interests") as string;

  const skills = skillsString ? skillsString.split(",").map(s => s.trim()) : [];
  const interests = interestsString ? interestsString.split(",").map(s => s.trim()) : [];

  try {
    await updateUser(session.userId, {
      firstName,
      lastName,
      bio,
      skills,
      interests
    });

    revalidatePath("/profile");
    revalidatePath("/dashboard");
  } catch (err: any) {
    console.error("Profile update error:", err.message);
  }
}
