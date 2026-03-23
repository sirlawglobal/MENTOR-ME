"use server";

import { registerUser, loginUser, logoutUser } from "./service";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  let success = false;
  let errorMessage = "";
  
  try {
    const data = Object.fromEntries(formData.entries());
    await registerUser(data);
    success = true;
  } catch (err: any) {
    errorMessage = err.message;
  }

  if (success) {
    redirect("/dashboard");
  } else {
    redirect("/signup?error=" + encodeURIComponent(errorMessage));
  }
}

export async function loginAction(formData: FormData) {
  let success = false;
  let errorMessage = "";
  
  try {
    const data = Object.fromEntries(formData.entries());
    await loginUser(data);
    success = true;
  } catch (err: any) {
    errorMessage = err.message;
  }

  if (success) {
    redirect("/dashboard");
  } else {
    redirect("/login?error=" + encodeURIComponent(errorMessage));
  }
}

export async function logoutAction() {
  await logoutUser();
  redirect("/login");
}
