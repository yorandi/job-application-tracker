"use client";
import Link from "next/link";
import { createApplication } from "@/app/(dashboard)/applications/action";

export default function newApplicationPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/applications"
          className="text-sm text-zinc-400 transition hover:text-white"
        >
          &larr; Back to Applications
        </Link>

        <div className="mt-6">
          <h2 className="text-3xl font-bold">Add application</h2>
          <p className="mt-2 text-zinc-400">
            Add a new job application to your tracker.
          </p>
        </div>
        <form action={createApplication} className="mt-8 space-y-6">
          <label htmlFor="company" className="m-2 block text-sm font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="ex. Google"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />

          <label htmlFor="position" className="m-2 block text-sm font-medium">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="ex. Junior Web Developer"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />

          <label htmlFor="location" className="m-2 block text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="ex. Jakarta, Indonesia"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />

          <div>
            <label htmlFor="status" className="m-2 block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
              defaultValue="Applied"
            >
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <label htmlFor="jobUrl" className="m-2 block text-sm font-medium">
            Job URL
          </label>
          <input
            id="jobUrl"
            name="jobUrl"
            type="text"
            placeholder="https://...."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
          />
          <div>
            <label htmlFor="notes" className="m-2 block text-sm font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              placeholder="Additional Information.."
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Link
              href="/applications"
              className="rounded-lg border-zinc-700 px-5 py-2.5 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-2.5 font-medium text-black transition hover:bg-zinc-200 hover:cursor-pointer"
            >
              Save Application
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
