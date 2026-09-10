"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {
  errors: {},
  message: "",
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      noValidate
      aria-busy={isPending}
      className="mt-8 space-y-5"
    >
      <div>
        <label htmlFor="email" className="mb-2 block text-sm">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 outline-none ${
            state.errors?.email
              ? "border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          }`}
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {state.errors.email[0]}
          </p>
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
          autoComplete="current-password"
          required
          aria-invalid={!!state.errors?.password}
          aria-describedby={
            state.errors?.password ? "password-error" : undefined
          }
          className={`w-full rounded-lg border bg-zinc-900 px-4 py-3 outline-none ${
            state.errors?.password
              ? "border-red-500"
              : "border-zinc-800 focus:border-zinc-600"
          }`}
        />
        {state.errors?.password && (
          <p id="password-error" className="mt-2 text-sm text-red-400">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <p aria-live="polite" aria-atomic="true" className="text-sm text-red-400">
        {state.message}
      </p>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black disabled:opacity-50"
      >
        {isPending ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
