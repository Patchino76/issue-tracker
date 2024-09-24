"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Spinner, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = async ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.put(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong !!!");
      setSubmitting(false);
    }
  });
  // await delay(1000)
  return (
    <Box className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title", { required: "Title is required !!!" })}
          defaultValue={issue?.title}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          defaultValue={issue?.description}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
