"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  updateApplication,
  type ApplicationFormState,
} from "@/app/(dashboard)/applications/actions";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

type EditApplicationFormProps = {
  application: {
    id: number;
    company: string;
    position: string;
    location: string | null;
    status: ApplicationStatus;
    jobUrl: string | null;
    notes: string | null;
  };
};

const initialState: ApplicationFormState = {
  errors: {},
  message: "",
};

export default function EditApplicationForm({
  application,
}: EditApplicationFormProps) {
  const updateAction = updateApplication.bind(null, application.id);

  const [state, formAction, isPending] = useActionState(
    updateAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mt-6 space-y-5 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 sm:p-6"
    >
      <div>
        <label htmlFor="company" className="mb-2 block text-sm font-medium">
          Company
        </label>

        <input
          id="company"
          name="company"
          defaultValue={application.company}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
        />

        {state.errors?.company && (
          <p className="mt-2 text-sm text-red-400">{state.errors.company[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="position" className="mb-2 block text-sm font-medium">
          Position
        </label>

        <input
          id="position"
          name="position"
          defaultValue={application.position}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
        />

        {state.errors?.position && (
          <p className="mt-2 text-sm text-red-400">
            {state.errors.position[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="mb-2 block text-sm font-medium">
          Location
        </label>

        <input
          id="location"
          name="location"
          defaultValue={application.location || ""}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
        />

        {state.errors?.location && (
          <p className="mt-2 text-sm text-red-400">
            {state.errors.location[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="mb-2 block text-sm font-medium">
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
        <label htmlFor="jobUrl" className="mb-2 block text-sm font-medium">
          Job URL
        </label>

        <input
          id="jobUrl"
          name="jobUrl"
          defaultValue={application.jobUrl || ""}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
        />

        {state.errors?.jobUrl && (
          <p className="mt-2 text-sm text-red-400">{state.errors.jobUrl[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={5}
          defaultValue={application.notes || ""}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none"
        />

        {state.errors?.notes && (
          <p className="mt-2 text-sm text-red-400">{state.errors.notes[0]}</p>
        )}
      </div>

      {state.message && (
        <div className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-zinc-800 pt-5 text-center sm:flex-row">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-white px-5 py-2.5 font-medium text-black disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Application"}
        </button>

        <Link
          href={`/applications/${application.id}`}
          className="rounded-lg border border-zinc-800 px-5 py-2.5 text-zinc-300 hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
