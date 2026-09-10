import { prisma } from "@/lib/prisma";
import ApplicationStatusChart from "@/components/application-status-chart";

export default async function AnalyticsPage() {
  const [totalApplications, applied, screening, interviews, offers, rejected] =
    await Promise.all([
      prisma.application.count(),

      prisma.application.count({
        where: {
          status: "APPLIED",
        },
      }),

      prisma.application.count({
        where: {
          status: "SCREENING",
        },
      }),

      prisma.application.count({
        where: {
          status: "INTERVIEW",
        },
      }),

      prisma.application.count({
        where: {
          status: "OFFER",
        },
      }),

      prisma.application.count({
        where: {
          status: "REJECTED",
        },
      }),
    ]);

  const interviewRate =
    totalApplications > 0 ? (interviews / totalApplications) * 100 : 0;

  const offerRate =
    totalApplications > 0 ? (offers / totalApplications) * 100 : 0;

  const rejectionRate =
    totalApplications > 0 ? (rejected / totalApplications) * 100 : 0;

  const stats = [
    {
      title: "Total Applications",
      value: totalApplications,
    },
    {
      title: "Interview Rate",
      value: `${interviewRate.toFixed(1)}%`,
    },
    {
      title: "Offer Rate",
      value: `${offerRate.toFixed(1)}%`,
    },
    {
      title: "Rejection Rate",
      value: `${rejectionRate.toFixed(1)}%`,
    },
  ];

  const applications = await prisma.application.findMany({
    select: {
      appliedAt: true,
    },

    orderBy: {
      appliedAt: "asc",
    },
  });

  const monthlyMap = new Map<string, number>();

  applications.forEach((application) => {
    const month = application.appliedAt.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);
  });

  const monthlyData = Array.from(monthlyMap, ([name, value]) => ({
    name,
    value,
  }));

  const chartData = [
    {
      name: "Applied",
      value: applied,
    },
    {
      name: "Screening",
      value: screening,
    },
    {
      name: "Interview",
      value: interviews,
    },
    {
      name: "Offer",
      value: offers,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>

          <p className="mt-2 text-zinc-400">
            Insights into your job application performance.
          </p>
        </div>

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

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Application Status</h2>

            <p className="mt-1 text-sm text-zinc-400">
              Distribution of your current application stages.
            </p>
          </div>

          <ApplicationStatusChart data={chartData} />
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Applications Over Time</h2>

            <p className="mt-1 text-sm text-zinc-400">
              Number of job applications submitted each month.
            </p>
          </div>

          <ApplicationStatusChart data={monthlyData} />
        </div>
      </div>
    </main>
  );
}
