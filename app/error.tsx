"use client";

export default function Error({
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-zinc-400">
          We couldn&apos;t complete your request. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-white px-4 py-2 font-medium text-black"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
