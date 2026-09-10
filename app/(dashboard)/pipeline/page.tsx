import { prisma } from "@/lib/prisma";
import PipelineCard from "@/components/pipeline-card";
import { requireUserId } from "@/lib/auth-user";

const columns = [
  {
    title: "Applied",
    status: "APPLIED",
  },
  {
    title: "Screening",
    status: "SCREENING",
  },
  {
    title: "Interview",
    status: "INTERVIEW",
  },
  {
    title: "Offer",
    status: "OFFER",
  },
] as const;

export default async function PipelinePage() {
  const userId = await requireUserId();
  const applications = await prisma.application.findMany({
    where: {
      userId,

      status: {
        not: "REJECTED",
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="px-4 py-6 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Application Pipeline
          </h1>

          <p className="mt-2 text-zinc-400">
            Track applications through each stage.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {columns.map((column) => {
            const columnApplications = applications.filter(
              (application) => application.status === column.status,
            );

            return (
              <section
                key={column.status}
                className="min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/50"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                  <h2 className="font-semibold">{column.title}</h2>

                  <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
                    {columnApplications.length}
                  </span>
                </div>

                <div className="space-y-3 p-3">
                  {columnApplications.length > 0 ? (
                    columnApplications.map((application) => (
                      <PipelineCard
                        key={application.id}
                        application={application}
                      />
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-500">
                      No applications
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
