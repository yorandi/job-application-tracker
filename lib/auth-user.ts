import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function requireUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return Number(session.user.id);
}

export async function requireUser() {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    redirect("/login");
  }

  return {
    id: Number(session.user.id),
    name: session.user.name,
    email: session.user.email,
  };
}
