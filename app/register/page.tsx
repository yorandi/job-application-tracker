import Link from "next/link";

import RegisterForm from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl sm:p-8">
        <div>
          <h1 className="text-3xl font-bold">Create account</h1>

          <p className="mt-2 text-zinc-400">
            Start tracking your job applications.
          </p>
        </div>
        <RegisterForm />
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
