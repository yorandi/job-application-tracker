"use client";

import { useState } from "react";

import { deleteApplication } from "@/app/(dashboard)/applications/actions";

type Props = {
  applicationId: number;
};

export default function DeleteApplicationButton({ applicationId }: Props) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-lg border border-red-900 bg-red-950 px-4 py-2 text-red-400"
      >
        Delete
      </button>
    );
  }

  const deleteAction = deleteApplication.bind(null, applicationId);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-400">Delete this application?</span>

      <form action={deleteAction}>
        <button
          type="submit"
          className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
        >
          Yes, delete
        </button>
      </form>

      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-lg border border-zinc-700 px-3 py-2 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
