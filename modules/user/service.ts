import { AppDataSource, initializeDb } from "@/lib/db";
import { User, UserRole } from "./entity";
import { Not } from "typeorm";

export async function getDiscoverableUsers(excludeUserId: string, targetRole: UserRole) {
  await initializeDb();
  const userRepo = AppDataSource.getRepository(User);

  return await userRepo.find({
    where: {
      id: Not(excludeUserId),
      role: targetRole
    },
    select: ["id", "firstName", "lastName", "role", "bio", "skills"],
    order: { firstName: "ASC" }
  });
}

export async function getUserById(userId: string) {
  await initializeDb();
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.findOneBy({ id: userId });
}

export async function updateUser(userId: string, data: Partial<User>) {
  await initializeDb();
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  Object.assign(user, data);
  return await userRepo.save(user);
}
