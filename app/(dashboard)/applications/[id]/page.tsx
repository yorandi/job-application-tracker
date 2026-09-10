import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/status-badge";
import { requireUserId } from "@/lib/auth-user";
import DeleteApplicationButton from "@/components/delete-application-button";

type pageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailPage({ params }: pageProps) {
  const userId = await requireUserId();
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: {
      id: Number(id),
      userId,
    },

    include: {
      applicationHistories: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!application) {
    notFound();
  }

  return (
    <main className="px-4 py-6 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/applications"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          &larr; Back to Applications
        </Link>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {application.company}
              </h1>
              <p className="mt-3 text-lg text-zinc-300">
                {application.position}
              </p>
            </div>
            <div>
              <StatusBadge status={application.status} />
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-6">
            <div>
              <p className="text-sm text-zinc-500">Location</p>

              <p className="mt-1">{application.location || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 mt-4">Application Date</p>

              <p className="mt-1">
                {application.appliedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 mt-4">Job Url</p>
              {application.jobUrl ? (
                <a
                  href={application.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-blue-400 transition hover:underline"
                >
                  View Job
                </a>
              ) : (
                <p className="mt-1">-</p>
              )}
            </div>
            <div>
              <p className="text-sm text-zinc-500 mt-4">Notes</p>
              <p className="mt-1 whitespace-pre-wrap">
                {application.notes || "-"}
              </p>
            </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">
              <h2 className="text-lg font-semibold">Activity Timeline</h2>

              <p className="mt-1 text-sm text-zinc-500">
                Status history for this application.
              </p>

              <div className="mt-6 space-y-5">
                {application.applicationHistories.length > 0 ? (
                  application.applicationHistories.map((history, index) => (
                    <div key={history.id} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-3 w-3 rounded-full bg-white" />

                        {index <
                          application.applicationHistories.length - 1 && (
                          <div className="mt-1 h-full w-px bg-zinc-800" />
                        )}
                      </div>

                      <div className="pb-5">
                        <StatusBadge status={history.status} />

                        <p className="mt-2 text-sm text-zinc-500">
                          {history.createdAt.toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-500">
                    No activity history yet.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
            <Link
              href={`/applications/${application.id}/edit`}
              className="rounded-lg bg-white px-6 py-3 font-medium text-black"
            >
              Edit
            </Link>
            <DeleteApplicationButton applicationId={application.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
