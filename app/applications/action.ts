"use server";
import { prisma } from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function createApplication(formData: FormData) {
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as
    | "APPLIED"
    | "SCREENING"
    | "INTERVIEW"
    | "OFFER"
    | "REJECTED";

    const jobUrl = formData.get("jobUrl") as string;
    const notes = formData.get("notes") as string;

    await prisma.application.create({
        data: {
            company,
            position,
            location: location || null,
            status,
            jobUrl: jobUrl || null,
            notes: notes || null,
        },
    });
    redirect("/applications");
}