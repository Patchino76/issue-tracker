"use client";
import { Button, Callout, TextArea, TextField, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const { register, control, handleSubmit, formState:{ errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  }); 
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <div className="max-w-xl">
      {errorMsg && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{errorMsg}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
  
          try {
            await axios.post("/api/issues", data);
            router.push("/issues"); 
          } catch (error) {
            console.log(error)
            setErrorMsg("Something went wrong !!!");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title", { required: "Title is required !!!" })} >
        </TextField.Root>
        {errors.title && <Text color="red">{errors.title.message}</Text>}
 
        <TextArea placeholder="Description" {...register("description", { required: "Description is required" })} />
        {errors.description && <Text color="red">{errors.description.message}</Text>}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
