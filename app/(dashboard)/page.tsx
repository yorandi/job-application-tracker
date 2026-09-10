import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/status-badge";
import { requireUser } from "@/lib/auth-user";

export default async function Home() {
  const user = await requireUser();

  const [
    totalApplications,
    totalInterviews,
    totalOffers,
    totalRejected,
    recentApplications,
  ] = await Promise.all([
    prisma.application.count({
      where: {
        userId: user.id,
      },
    }),

    prisma.application.count({
      where: {
        userId: user.id,
        status: "INTERVIEW",
      },
    }),

    prisma.application.count({
      where: {
        userId: user.id,
        status: "OFFER",
      },
    }),

    prisma.application.count({
      where: {
        userId: user.id,
        status: "REJECTED",
      },
    }),

    prisma.application.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),
  ]);

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
    },
    {
      title: "Interviews",
      value: totalInterviews,
    },
    {
      title: "Offers",
      value: totalOffers,
    },
    {
      title: "Rejected",
      value: totalRejected,
    },
  ];

  return (
    <main className="p-8">
      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <p className="mt-2 text-zinc-400">
          Track and manage your job applications.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm text-zinc-400">{stat.title}</p>

              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Recent Applications</h3>

              <p className="text-sm text-zinc-400">
                Your latest job applications.
              </p>
            </div>

            <Link
              href="/applications/new"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              + Add Application
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left">
              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr>
                  <th className="px-5 py-3 text-sm font-medium text-zinc-400">
                    Company
                  </th>

                  <th className="px-5 py-3 text-sm font-medium text-zinc-400">
                    Position
                  </th>

                  <th className="px-5 py-3 text-sm font-medium text-zinc-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-sm font-medium text-zinc-400">
                    Applied
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.length > 0 ? (
                  recentApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="border-b border-zinc-800 last:border-none hover:bg-zinc-900/50"
                    >
                      <td className="px-5 py-4 font-medium">
                        <Link
                          href={`/applications/${application.id}`}
                          className="hover:underline"
                        >
                          {application.company}
                        </Link>
                      </td>

                      <td className="px-5 py-4 text-zinc-300">
                        {application.position}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={application.status} />
                      </td>

                      <td className="px-5 py-4 text-zinc-400">
                        {application.appliedAt.toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-zinc-500"
                    >
                      No applications yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
