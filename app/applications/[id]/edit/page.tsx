import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateApplication } from "../../action";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({ params }: PageProps) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!application) {
    notFound();
  }

  const updateAction = updateApplication.bind(null, application.id);

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/applications/${application.id}`}
          className="text-sm text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Edit Application</h1>

        <form action={updateAction} className="mt-8 space-y-6">
          <div>
            <label htmlFor="company" className="mb-2 block text-sm">
              Company
            </label>

            <input
              id="company"
              name="company"
              defaultValue={application.company}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="position" className="mb-2 block text-sm">
              Position
            </label>

            <input
              id="position"
              name="position"
              defaultValue={application.position}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block text-sm">
              Location
            </label>

            <input
              id="location"
              name="location"
              defaultValue={application.location || ""}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="status" className="mb-2 block text-sm">
              Status
            </label>

            <select
              id="status"
              name="status"
              defaultValue={application.status}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            >
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div>
            <label htmlFor="jobUrl" className="mb-2 block text-sm">
              Job URL
            </label>

            <input
              id="jobUrl"
              name="jobUrl"
              defaultValue={application.jobUrl || ""}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-sm">
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              rows={5}
              defaultValue={application.notes || ""}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-2.5 font-medium text-black hover:cursor-pointer"
          >
            Update Application
          </button>
        </form>
      </div>
    </main>
  );
}
