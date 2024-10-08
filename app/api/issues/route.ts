import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = IssueSchema.safeParse(body);

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
