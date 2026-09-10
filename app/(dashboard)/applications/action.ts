"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-user";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

export async function createApplication(formData: FormData) {
  const user = await requireUser();

  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;

  const status = formData.get("status") as ApplicationStatus;

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

      userId: user.id,

      histories: {
        create: {
          status,
        },
      },
    },
  });

  redirect("/applications");
}

export async function updateApplication(id: number, formData: FormData) {
  const user = await requireUser();
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const location = formData.get("location") as string;

  const status = formData.get("status") as ApplicationStatus;

  const jobUrl = formData.get("jobUrl") as string;
  const notes = formData.get("notes") as string;

  const currentApplication = await prisma.application.findUnique({
    where: {
      id,
      userId: user.id,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!currentApplication) {
    throw new Error("Application not found or access denied");
  }

  const statusChanged = currentApplication.status !== status;

  await prisma.application.update({
    where: {
      id: currentApplication.id,
    },

    data: {
      company,
      position,
      location: location || null,
      status,
      jobUrl: jobUrl || null,
      notes: notes || null,

      ...(statusChanged && {
        applicationHistories: {
          create: {
            status,
          },
        },
      }),
    },
  });

  redirect(`/applications/${id}`);
}

export async function deleteApplication(id: number) {
  const user = await requireUser();
  const result = await prisma.application.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!result) {
    throw new Error("Application not found or access denied");
  }

  redirect("/applications");
}

export async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
) {
  const user = await requireUser();

  const application = await prisma.application.findFirst({
    where: {
      id,
      userId: user.id,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!application) {
    throw new Error("Application not found or access denied.");
  }

  if (application.status === status) {
    return;
  }

  await prisma.application.update({
    where: {
      id: application.id,
    },

    data: {
      status,

      histories: {
        create: {
          status,
        },
      },
    },
  });
}
