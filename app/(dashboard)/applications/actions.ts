"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/auth-user";
import { ApplicationSchema } from "@/lib/validations/application";

type ApplicationStatus =
  "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED";

export async function createApplication(
  previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const userId = await requireUserId();

  const validatedFields = ApplicationSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    location: formData.get("location"),
    status: formData.get("status"),
    jobUrl: formData.get("jobUrl"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,

      message: "Please fix the errors below.",
    };
  }

  const { company, position, location, status, jobUrl, notes } =
    validatedFields.data;

  try {
    await prisma.application.create({
      data: {
        company,
        position,
        location: location || null,
        status,
        jobUrl: jobUrl || null,
        notes: notes || null,

        userId,

        applicationHistories: {
          create: {
            status,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Something went wrong while creating the application.",
    };
  }

  redirect("/applications");
}

export async function updateApplication(
  id: number,
  previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  const userId = await requireUserId();

  const validatedFields = ApplicationSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    location: formData.get("location"),
    status: formData.get("status"),
    jobUrl: formData.get("jobUrl"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { company, position, location, status, jobUrl, notes } =
    validatedFields.data;

  const currentApplication = await prisma.application.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!currentApplication) {
    return {
      message: "Application not found or access denied.",
    };
  }

  const statusChanged = currentApplication.status !== status;

  try {
    await prisma.application.update({
      where: {
        id: currentApplication.id,
        userId,
      },
      data: {
        company,
        position,
        location: location || null,
        status,
        jobUrl: jobUrl || null,
        notes: notes || null,

        ...(statusChanged && {
          histories: {
            create: {
              status,
            },
          },
        }),
      },
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Something went wrong while updating the application.",
    };
  }

  redirect(`/applications/${id}`);
}

export async function deleteApplication(id: number) {
  const userId = await requireUserId();
  const result = await prisma.application.deleteMany({
    where: {
      id,
      userId,
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
  const userId = await requireUserId();

  const application = await prisma.application.findFirst({
    where: {
      id,
      userId,
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
      userId,
    },

    data: {
      status,

      applicationHistories: {
        create: {
          status,
        },
      },
    },
  });
}

export type ApplicationFormState = {
  errors?: {
    company?: string[];
    position?: string[];
    location?: string[];
    status?: string[];
    jobUrl?: string[];
    notes?: string[];
  };

  message?: string;
};
