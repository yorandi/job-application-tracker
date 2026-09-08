import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/status-badge";
import {deleteApplication} from "../action";

type pageProps = {
    params: Promise<{
        id: string;
    }>
}

export default async function ApplicationDetailPage({ 
    params,
    }: pageProps) {
        const {id} = await params;
        const application = await prisma.application.findUnique({
            where: {
                id: Number(id),
            },
           
        })
        if(!application) {
            notFound();
        }
        const deleteAction = deleteApplication.bind(
            null,
            application.id
        );
    
    return (
        <main className="min-h-screen bg-zinc-950 p-8 text-white">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/applications"
                    className="text-sm text-zinc-400 transition hover:text-white"
                >
                    &larr; Back to Applications
                </Link>

                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="flex item-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {application.company}
                            </h1>
                            <p className="mt-3 text-lg text-zinc-300">
                                {application.position}
                            </p>
                        </div>
                        <div>
                            <StatusBadge status={application.status} />
                        </div>
                    </div>

                    <div className="mt-6 p-6">
                        <div>
                            <p className="text-sm text-zinc-500">
                                Location
                            </p>

                            <p className="mt-1">
                                {application.location || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500 mt-4">
                                Application Date
                            </p>

                            <p className="mt-1">
                                {application.appliedAt.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500 mt-4">
                                Job Url
                            </p>
                            {application.jobUrl ? (
                                <a
                                    href={application.jobUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-1 inline-block text-blue-400 transition hover:underline"
                                    >
                                    View Job
                                </a>
                            ) : (
                                <p className="mt-1">
                                    -
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 mt-4">
                                Notes
                            </p>
                            <p className="mt-1 whitespace-pre-wrap">
                                {application.notes || "-"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <Link
                            href={`/applications/${application.id}/edit`}
                            className="rounded-lg bg-white px-6 py-3 font-medium text-black">
                            Edit
                        </Link>
                        <form action={deleteAction}>
                            <button
                                type="submit"
                                className="rounded-lg border border-red-900 bg-red-950 px-6 py-3 text-red-400 hover:cursor-pointer"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}