import Link from "next/link";

import ApplicationForm from "@/components/application-form";

export default function NewApplicationPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/applications"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          ← Back to Applications
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">Add Application</h1>

          <p className="mt-2 text-zinc-400">
            Add a new job application to your tracker.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </main>
  );
}
