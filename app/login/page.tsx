import Link from "next/link";

import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl sm:p-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="mt-2 text-zinc-400">
            Sign in to your JobTrack account.
          </p>
        </div>

        <LoginForm />

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
