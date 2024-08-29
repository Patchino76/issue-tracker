"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForma {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const { register, control, handleSubmit } = useForm<IssueForma>();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <div className="max-w-xl">
        {errorMsg && <Callout.Root className="mb-5">
            <Callout.Text color="red">{errorMsg}</Callout.Text>
            </Callout.Root>}
        <form
          className="space-y-3"
          onSubmit={handleSubmit(async (data) => {
            try {
              await axios.post("/api/issues", data);
              router.push("/issues");
            } catch (error) {
              setErrorMsg("Something went wrong");
            }
          })}
        >
          <TextField.Root
            placeholder="Title"
            {...register("title")}
          ></TextField.Root>
          {/* <Controller
            name="description"
            control={control}
            render={(field) => <SimpleMDE placeholder="Description" {...field} />}
          /> */}
          <TextArea placeholder="Description" {...register("description")} />
          <Button type="submit">Submit New Issue</Button>
        </form>
    </div>
  );
};

export default NewIssuesPage;
