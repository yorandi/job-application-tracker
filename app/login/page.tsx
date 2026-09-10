import Link from "next/link";

import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="mt-2 text-zinc-400">
            Sign in to your JobTrack account.
          </p>
        </div>

        <form action={login} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
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
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
