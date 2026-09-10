"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { updateApplicationStatus } from "@/app/(dashboard)/applications/actions";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

type Application = {
  id: number;
  company: string;
  position: string;
  location: string | null;
  status: ApplicationStatus;
};

type PipelineCardProps = {
  application: Application;
};

const statusOrder: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
];

export default function PipelineCard({ application }: PipelineCardProps) {
  const router = useRouter();

  const currentIndex = statusOrder.indexOf(application.status);

  const previousStatus =
    currentIndex > 0 ? statusOrder[currentIndex - 1] : null;

  const nextStatus =
    currentIndex >= 0 && currentIndex < statusOrder.length - 1
      ? statusOrder[currentIndex + 1]
      : null;

  async function changeStatus(status: ApplicationStatus) {
    await updateApplicationStatus(application.id, status);

    router.refresh();
  }

  return (
    <div className="min-w-0 break-words rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <Link
        href={`/applications/${application.id}`}
        className="font-semibold hover:underline"
      >
        {application.company}
      </Link>

      <p className="mt-1 text-sm text-zinc-400">{application.position}</p>

      {application.location && (
        <p className="mt-2 text-xs text-zinc-500">{application.location}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {previousStatus && (
          <button
            onClick={() => changeStatus(previousStatus)}
            className="min-h-11 rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300 transition hover:bg-zinc-800"
          >
            ← Back
          </button>
        )}

        {nextStatus && (
          <button
            onClick={() => changeStatus(nextStatus)}
            className="min-h-11 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-200"
          >
            Next →
          </button>
        )}
        <button
          onClick={() => changeStatus("REJECTED")}
          className="min-h-11 rounded-md px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-950"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
