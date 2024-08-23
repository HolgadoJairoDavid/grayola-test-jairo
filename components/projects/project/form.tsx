"use client";
import React from "react";
import { updateProject, getUserWithEmail} from "@/app/projects/actions";
import { projectSchema } from "@/app/schemas";
import { Project, ProjectFormUpdate, User } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState} from "react";
import { getUser } from "@/app/login/actions";

interface EditProjectFormProps {
  project: Project;
}

type CustomFile = {
  type: string;
  url: string;
  name: string;
};

const EditProjectForm: React.FC<EditProjectFormProps> = ({ project}) => {
  const supabase = createClient();
  const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);
  const [files, setFiles] = useState<CustomFile[]>([]);
  const defaultValues = {
    title: project?.title,
    description: project?.description,
  };

  const form = useForm<ProjectFormUpdate>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProjectFormUpdate) => {

    try {
      await updateProject(values, project.id || "");
      toast.success("Project updated", {
        description: "Your project has been updated successfully.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Error updating the project.",
      });
      form.reset(defaultValues);
    }
  };

  

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!hasPermissionToEdit) {
      toast.error("Error", {
        description: "You don't have permission to edit this project.",
      });
    }
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Error", {
        description: "Please select a file to upload",
      });
    } else {
      // console.log("file", file);
      const fileExt = file.name.split(".").pop();
      const filePath = `${project.id}/${Math.random()}-${fileExt}`;

      const { error } = await supabase.storage
        .from("assets")
        .upload(filePath, file);
      // console.log("upd error", error, data);
      toast.success("Success", {
        description: "File updated successfully!",
      });
      // reload the page
      if (error) {
        toast.error("Error", {
          description: "Error updating the file.",
        });
      }
    }
  };

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const verifyUser = async () => {
      const userResponse = await getUser();
        
      // Ensure the user exists
      if (!userResponse) {
        console.error('Could not retrieve user.');
        return;
      }

      setUser({
        id: userResponse?.id || "",
        email: userResponse?.email || "",
        role: ""
      });

      const { data, error } = await getUserWithEmail(userResponse?.email || "");
      // Error handling if no data
      if (error || !data) {
        console.error('Error retrieving user data:', error, userResponse?.email);
        return; 
      }
      
      setUser(prevUser => ({
        ...prevUser,
        role: data?.role || ""
      }));
    };
    verifyUser();
  }, [supabase]);

  useEffect(() => {
    async function downloadFiles() {
      try {
        const { data, error } = await supabase.storage
          .from("assets")
          .list(`${project.id}/`, {
            limit: 2,
            offset: 0,
          });
        if (error) {
          toast.error("Error", {
            description: "Error downloading the files",
          });
        }
        // console.log("FILES", data);
        // const url = URL.createObjectURL(data);
        const newFileUrls = data?.map((file) => {
          const baseUrl = `https://wwlgqpvbeksafvqkgrib.supabase.co/storage/v1/object/public/assets/`;
          const extUrl = `${project.id}/${file.name}`;
          const url = baseUrl + extUrl;

          return {
            type: file.metadata.mimetype,
            url,
            name: file.name,
          };
        });
        setFiles(newFileUrls || []);
      } catch (error) {
        // console.log("Error downloading image: ", error);
        toast.error("Error", {
          description: "Error downloading the files",
        });
      }
    }
    downloadFiles();
  }, [supabase]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <p>Title</p>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  placeholder="your project title"
                  className="text-black md:text-4xl font-bold py-8"
                  readOnly={user?.role !== "project_manager"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Separator /> */}

          <p>Description</p>
        <div className="flex md:flex-row flex-col gap-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full focus:outline-none">
                <FormLabel />
                <FormControl className="focus:outline-none">
                  <Textarea
                    placeholder="Tell us about your project"
                    className="resize-none text-neutral-500 focus:outline-none focus:border-black"
                    readOnly={user?.role !== "project_manager"}
                    {...field}
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <p className="text-neutral-500">{project.description}</p> */}
          <div
            className="border rounded-md p-4 flex flex-col items-between gap-2
      max-w-[300px]"
          >
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-2">
                <span className="text-sm text-neutral-500">Project owner:</span>
                <span className="font-bold truncate">{project?.user?.email}</span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-sm text-neutral-500">
                  Project manager:
                </span>
                <span className="font-bold truncate">
                  {project?.project_manager
                    ? project?.project_manager?.email
                    : "Unassigned"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="files"
          render={({ field }) => ( */}
      
          <FormItem>
            <FormLabel />
            <ul className="flex flex-wrap gap-2">
              {files
                .sort((a, b) => a.type.localeCompare(b.type)) // Sorting files by type
                .map((file) => {
                  if (file.type.includes("image")) {
                    return (
                      <li key={file.name} className="p-2 border  rounded-md">
                        <a href={file.url} download>
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-64 h-auto object-cover"
                          />
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={file.name}
                      className="p-2 border rounded-md w-fit h-fit"
                    >
                      <a href={file.url} download className="flex gap-2">
                        <ArrowRight className="w-5 -rotate-45" />
                        <span className="truncate">{file.name}</span>
                      </a>
                    </li>
                  );
                })}
            </ul>
            {hasPermissionToEdit && (

            <FormControl>
              <Input
                type="file"
                placeholder="upload the assets for your project"
                className="text-black  font-bold py-8"
                readOnly={!hasPermissionToEdit}
                onChange={handleFileUpload}
                // {...field}
              />
            </FormControl>
            )}
            <FormMessage />
          </FormItem>
        
        {/* )}
        /> */}
        <Button disabled={user?.role !== "project_manager"} type="submit" className="gap-2 bg-slate-950 hover:bg-slate-900 text-slate-200">
          Apply changes
        </Button>
      </form>
    </Form>
  );
};

export default EditProjectForm;