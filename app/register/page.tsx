import Link from "next/link";

import { registerUser } from "./actions";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-3xl font-bold">Create account</h1>

          <p className="mt-2 text-zinc-400">
            Start tracking your job applications.
          </p>
        </div>

        <form action={registerUser} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm">
              Name
            </label>

            <input
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
