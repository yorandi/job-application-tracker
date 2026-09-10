import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-user";
import EditApplicationForm from "@/components/edit-application-form";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditApplicationPage({ params }: PageProps) {
  const { id } = await params;
  const userId = await requireUserId();

  const application = await prisma.application.findUnique({
    where: {
      id: Number(id),
      userId,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <main className="px-4 py-6 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/applications/${application.id}`}
          className="text-sm text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Application
        </h1>

        <EditApplicationForm application={application} />
      </div>
    </main>
  );
}
