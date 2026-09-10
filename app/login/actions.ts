"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";

const LoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email."),
  password: z.string().min(1, "Please enter your password."),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
  });

  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid email or password.",
          };

        default:
          return {
            message: "Something went wrong. Please try again.",
          };
      }
    }

    throw error;
  }
}
