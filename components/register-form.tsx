"use client";

import { useActionState } from "react";
// import Link from "next/link";

import { registerUser, type RegisterState } from "@/app/register/actions";

const initialState: RegisterState = {
  errors: {},
  message: "",
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  );
  return (
    <form action={formAction} noValidate className="mt-8 space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm">
          Name
        </label>

        <input
          id="name"
          name="name"
          className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 outline-none ${
            state.errors?.name
              ? "border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          }`}
        />

        {state.errors?.name && (
          <p className="mt-2 text-sm text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 outline-none ${
            state.errors?.email
              ? "border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          }`}
        />

        {state.errors?.email && (
          <p className="mt-2 text-sm text-red-400">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 outline-none ${
            state.errors?.password
              ? "border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          }`}
        />

        {state.errors?.password && (
          <p className="mt-2 text-sm text-red-400">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {state.message && <p className="text-sm text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black disabled:opacity-50"
      >
        {isPending ? "Creating Account..." : "Create account"}
      </button>
    </form>
  );
}
