import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-user";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const userId = await requireUserId();
  const params = await searchParams;

  const search = params.search || "";
  const status = params.status || "";

  const applications = await prisma.application.findMany({
    where: {
      userId,

      AND: [
        search
          ? {
              OR: [
                {
                  company: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  position: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  location: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},

        status
          ? {
              status: status as ApplicationStatus,
            }
          : {},
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="px-4 py-6 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Applications
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage and track your job applications.
            </p>
          </div>

          <Link
            href="/applications/new"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200"
          >
            + Add Application
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6">
          <form className="grid gap-3 sm:grid-cols-2 xl:flex">
            <input
              type="search"
              aria-label="Search applications"
              name="search"
              defaultValue={search}
              placeholder="Search company, position, location..."
              className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 outline-none focus:border-zinc-600"
            />

            <select
              aria-label="Filter by status"
              name="status"
              defaultValue={status}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5"
            >
              <option value="">All Status</option>

              <option value="APPLIED">Applied</option>

              <option value="SCREENING">Screening</option>

              <option value="INTERVIEW">Interview</option>

              <option value="OFFER">Offer</option>

              <option value="REJECTED">Rejected</option>
            </select>

            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2.5 font-medium text-black transition hover:bg-zinc-200 hover:cursor-pointer"
            >
              Search
            </button>
            <Link
              href="/applications"
              className="text-center rounded-lg border border-zinc-800 px-4 py-2.5 text-zinc-300 hover:bg-zinc-900"
            >
              Reset
            </Link>
          </form>
          <div
            className="mt-6 overflow-x-auto rounded-lg border border-zinc-800"
            role="region"
            aria-label="Applications table"
            tabIndex={0}
          >
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">
                Your job applications and their current status
              </caption>
              <thead className="border-b border-zinc-800 bg-zinc-900">
                <tr>
                  <th scope="col" className="px-5 py-3 text-sm text-zinc-400">
                    Company
                  </th>

                  <th scope="col" className="px-5 py-3 text-sm text-zinc-400">
                    Position
                  </th>

                  <th scope="col" className="px-5 py-3 text-sm text-zinc-400">
                    Location
                  </th>

                  <th scope="col" className="px-5 py-3 text-sm text-zinc-400">
                    Status
                  </th>

                  <th scope="col" className="px-5 py-3 text-sm text-zinc-400">
                    Applied
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.length > 0 ? (
                  applications.map((application) => (
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

                      <td className="px-5 py-4 text-zinc-400">
                        {application.location || "-"}
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
                      colSpan={5}
                      className="px-5 py-12 text-center text-zinc-500"
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
