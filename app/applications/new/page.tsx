"use client";
import Link from "next/link";
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const company = formData.get("company");
  const position = formData.get("position");
  const location = formData.get("location");
  const status = formData.get("status");
  const jobUrl = formData.get("jobUrl");
  const notes = formData.get("notes");

  console.log({
    company,
    position,
    location,
    status,
    jobUrl,
    notes,
  });
}

export default function newApplicationPage(){
    return (
        <main className="min-h-screen bg-zinc-950 p-8 text-white">
            <div className="mx-auto max-w-2xl">
            <Link
                href="/applications"
                className="text-sm text-zinc-400 transition hover:text-white"
            >
                &larr; Back to Applications
            </Link>

            <div className="mt-6">
                <h2 className="text-3xl font-bold">
                    Add application
                </h2>
                <p className="mt-2 text-zinc-400">
                    Add a new job application to your tracker.
                </p>
            </div>
                <form 
                onSubmit={handleSubmit}
                className="mt-8 space-y-6">
                    <label
                        htmlFor="company"
                        className="m-2 block text-sm font-medium"
                    >
                        Company
                    </label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="ex. Google"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
                    />

                    <label
                        htmlFor="application"
                        className="m-2 block text-sm font-medium"
                    >
                        Application
                    </label>
                    <input
                        id="application"
                        name="application"
                        type="text"
                        placeholder="ex. Junio Web Developer"
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
                    />

                    <label
                        htmlFor="location"
                        className="m-2 block text-sm font-medium"
                    >
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
                        <label
                            htmlFor="status"
                            className="m-2 block text-sm font-medium"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
                            defaultValue="Applied"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Screening">Screening</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <label
                        htmlFor="jobUrl"
                        className="m-2 block text-sm font-medium"
                    >
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
                    <label
                        htmlFor="notes"
                        className="m-2 block text-sm font-medium"
                    >
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
    )
}