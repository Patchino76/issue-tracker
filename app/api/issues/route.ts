import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";


const schemaSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();


  const validation = schemaSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors[0], { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  if (!newIssue) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
  return NextResponse.json(newIssue, { status: 201 });
}
