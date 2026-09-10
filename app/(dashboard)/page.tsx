import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-user";
import StatusBadge from "@/components/status-badge";

export default async function DashboardPage() {
  const userId = await requireUserId();

  const [
    totalApplications,
    totalInterviews,
    totalOffers,
    totalRejected,
    recentApplications,
  ] = await Promise.all([
    prisma.application.count({
      where: {
        userId,
      },
    }),

    prisma.application.count({
      where: {
        userId,
        status: "INTERVIEW",
      },
    }),

    prisma.application.count({
      where: {
        userId,
        status: "OFFER",
      },
    }),

    prisma.application.count({
      where: {
        userId,
        status: "REJECTED",
      },
    }),

    prisma.application.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return (
    <main className="px-4 py-6 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Overview of your job applications.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Total Applications</p>

            <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {totalApplications}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Interviews</p>

            <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {totalInterviews}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Offers</p>

            <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {totalOffers}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Rejected</p>

            <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {totalRejected}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 p-5">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Your latest job applications.
              </p>
            </div>

            <Link
              href="/applications"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-zinc-800">
            {recentApplications.length > 0 ? (
              recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/applications/${application.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 transition hover:bg-zinc-800/50"
                >
                  <div>
                    <p className="font-medium">{application.company}</p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {application.position}
                    </p>
                  </div>

                  <StatusBadge status={application.status} />
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-zinc-500">
                No applications yet.
                <Link
                  href="/applications/new"
                  className="mt-3 block font-medium text-blue-400 hover:text-blue-300"
                >
                  Add your first application &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
