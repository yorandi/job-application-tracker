import Link from "next/link";
import StatusBadge from "@/components/status-badge";
import { prisma } from "@/lib/prisma";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

type Application = {
  id: number;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: string;
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const search = params.search || "";
  const status = params.status || "";

  const applications = await prisma.application.findMany({
    where: {
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
              status: status as
                "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED",
            }
          : {},
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>

            <p className="mt-2 text-zinc-400">
              Manage and track your job applications.
            </p>
          </div>

          <Link
            href="/applications/new"
            className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200"
          >
            + Add Application
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800 p-6">
          <form className="mt-8 flex gap-3">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search company, position, location..."
              className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 outline-none focus:border-zinc-600"
            />

            <select
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
              className="rounded-lg border border-zinc-800 px-4 py-2.5 text-zinc-300 hover:bg-zinc-900"
            >
              Reset
            </Link>
          </form>
          <table className="w-full text-left mt-6">
            <thead className="border-b border-zinc-800 bg-zinc-900">
              <tr>
                <th className="px-5 py-3 text-sm text-zinc-400">Company</th>

                <th className="px-5 py-3 text-sm text-zinc-400">Position</th>

                <th className="px-5 py-3 text-sm text-zinc-400">Location</th>

                <th className="px-5 py-3 text-sm text-zinc-400">Status</th>

                <th className="px-5 py-3 text-sm text-zinc-400">Applied</th>
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
    </main>
  );
}
