import { initializeDb } from "../../lib/db";
import { User, UserRole } from "../user/entity";
import * as bcrypt from "bcrypt";
import { createSession, deleteSession } from "../../lib/auth/session";

export async function registerUser(data: any) {
  const db = await initializeDb();
  const userRepository = db.getRepository(User);

  const existing = await userRepository.findOne({ where: { email: data.email } });
  if (existing) {
    throw new Error("Email Already In Use");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    passwordHash,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role || UserRole.MENTEE,
    bio: data.bio || "",
    skills: data.skills || [],
    interests: data.interests || [],
  });

  await userRepository.save(newUser);
  await createSession(newUser.id, newUser.role, newUser.firstName);
  return newUser;
}

export async function loginUser(data: any) {
  const db = await initializeDb();
  const userRepository = db.getRepository(User);

  const user = await userRepository.findOne({ where: { email: data.email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  await createSession(user.id, user.role, user.firstName);
  return user;
}

export async function logoutUser() {
  await deleteSession();
}
