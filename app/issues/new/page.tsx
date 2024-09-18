"use client";
import { Button, Callout, TextArea, TextField, Text, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/api/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const { register, control, handleSubmit, formState:{ errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  }); 
  const [isSubmitting, setSubmitting] = useState(false)
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <div className="max-w-xl">

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
  
          try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues"); 
          } catch (error) {
            console.log(error)
            setErrorMsg("Something went wrong !!!");
            setSubmitting(false)
          }
        })}
      >
        <TextField.Root 
          placeholder="Title"
          {...register("title", { required: "Title is required !!!" })} >
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>:
 
        <TextArea placeholder="Description" {...register("description", { required: "Description is required" })} />
         <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>:
      </form>
    </div>
  );
};

export default NewIssuesPage;
