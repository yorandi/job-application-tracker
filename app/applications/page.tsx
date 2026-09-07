import Link from "next/link";
import StatusBadge from "@/components/status-badge";

type ApplicationStatus =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Rejected";

type Application = {
  id: number;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  appliedAt: string;
};

const applications: Application[] = [
  {
    id: 1,
    company: "Google",
    position: "Junior Software Engineer",
    location: "Singapore",
    status: "Interview",
    appliedAt: "Sep 5, 2026",
  },
  {
    id: 2,
    company: "Shopee",
    position: "Backend Developer",
    location: "Jakarta",
    status: "Applied",
    appliedAt: "Sep 3, 2026",
  },
  {
    id: 3,
    company: "Telkom Indonesia",
    position: "IT Support",
    location: "Batam",
    status: "Screening",
    appliedAt: "Sep 1, 2026",
  },
  {
    id: 4,
    company: "GoTo",
    position: "Junior Engineer",
    location: "Jakarta",
    status: "Rejected",
    appliedAt: "Aug 29, 2026",
  },
];

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Applications
            </h1>

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

        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800 bg-zinc-900">
              <tr>
                <th className="px-5 py-3 text-sm text-zinc-400">
                  Company
                </th>

                <th className="px-5 py-3 text-sm text-zinc-400">
                  Position
                </th>

                <th className="px-5 py-3 text-sm text-zinc-400">
                  Location
                </th>

                <th className="px-5 py-3 text-sm text-zinc-400">
                  Status
                </th>

                <th className="px-5 py-3 text-sm text-zinc-400">
                  Applied
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-zinc-800 last:border-none hover:bg-zinc-900/50"
                >
                  <td className="px-5 py-4 font-medium">
                    {application.company}
                  </td>

                  <td className="px-5 py-4 text-zinc-300">
                    {application.position}
                  </td>

                  <td className="px-5 py-4 text-zinc-400">
                    {application.location}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={application.status} />
                  </td>

                  <td className="px-5 py-4 text-zinc-400">
                    {application.appliedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}