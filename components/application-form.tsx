"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  createApplication,
  type ApplicationFormState,
} from "@/app/(dashboard)/applications/actions";

const initialState: ApplicationFormState = {
  errors: {},
  message: "",
};

export default function ApplicationForm() {
  const [state, formAction, isPending] = useActionState(
    createApplication,
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
          placeholder="e.g. Mayora"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
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
          placeholder="e.g. Junior Developer"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
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
          placeholder="e.g. Batam"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
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
          defaultValue="APPLIED"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3"
        >
          <option value="APPLIED">Applied</option>

          <option value="SCREENING">Screening</option>

          <option value="INTERVIEW">Interview</option>

          <option value="OFFER">Offer</option>

          <option value="REJECTED">Rejected</option>
        </select>

        {state.errors?.status && (
          <p className="mt-2 text-sm text-red-400">{state.errors.status[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="jobUrl" className="mb-2 block text-sm font-medium">
          Job URL
        </label>

        <input
          id="jobUrl"
          name="jobUrl"
          type="url"
          placeholder="https://..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
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
          placeholder="Interview notes, recruiter contact..."
          className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
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
          className="rounded-lg bg-white px-5 py-2.5 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Application"}
        </button>

        <Link
          href="/applications"
          className="rounded-lg border border-zinc-800 px-5 py-2.5 text-zinc-300 transition hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
