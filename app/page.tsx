import StatusBadge from "@/components/status-badge";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
type Stat = {
  title: string;
  value: number;
};

const stats: Stat[] = [
  {
    title: "Total Applications",
    value: 12,
  },
  {
    title: "interviews",
    value: 5,
  },
  {
    title: "Offers",
    value: 2,
  },
];

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

export default async function Home() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="min-h-screen flex bg-zinc-950 text-white">
      <aside className="w-64 border-r border-zinc-800 p-6">
        <h1 className="text-xl font-bold">Job Track</h1>

        <nav className="mt-10 space-y-4 text-zinc-400">
          <Link href="/" className="block text-white">
            Dashboard
          </Link>

          <Link
            href="/applications"
            className="block transition hover:text-white"
          >
            Applications
          </Link>

          <Link href="/Analytics" className="block transition hover:text-white">
            Analytics
          </Link>
        </nav>
      </aside>

      <section className="flex-1 p-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-2 text-zinc-400">
          Track and manage your job applications.
        </p>
        {/* stat cards section */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm text-zinc-400">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* job applications table */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Recent Applications</h3>

              <p className="text-sm text-zinc-400">
                Your Latest Job Applications
              </p>
            </div>

            <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
              <Link href="/applications">Add Application</Link>
            </button>
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
                    Applied At
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-zinc-800 bg-zinc-950"
                  >
                    <td className="px-5 py-4">{application.company}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
