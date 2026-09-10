import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateApplication } from "../../actions";
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

  const updateAction = updateApplication.bind(null, application.id);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/applications/${application.id}`}
          className="text-sm text-zinc-400 hover:text-white"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-bold">Edit Application</h1>

        <EditApplicationForm application={application} />
      </div>
    </main>
  );
}
