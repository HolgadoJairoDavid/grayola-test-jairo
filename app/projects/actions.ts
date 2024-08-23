"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { Project, ProjectForm, ProjectFormUpdate, User } from "../types";
import { projectSchema } from "../schemas";

export const getAllProjects = async (role: string): Promise<{ data: Project[]; error: any }> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Invalid user.");
  if (role == "project_manager" || role == "designer") {
    const { data, error } = await supabase
    .from("projects")
    .select("*")
    if (error) throw new Error("Error fetching projects");
  return {data, error};
  }
  if (role == "client"){
    const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id);
    if (error) throw new Error("Error fetching projects");
  return {data, error};
  }
  return {data: [], error: null}
};

export const getProject = async (projectID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectID)
    .single();

  if (error || !data) throw new Error("Error fetching project");
  return data as unknown as Project;
};

export const removeProject = async (projectID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectID)
    .select();

  if (error || !data.length) {
    throw new Error("The project could not be deleted.");
  } else {
    revalidatePath("/projects");
  }
};

export const createProject = async (formData: ProjectForm) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Invalid user.");
  const validatedFields = projectSchema.safeParse(formData);

  // validate this with zod => early server side validation
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // properly type for supabase is needed => consult on documentation
  //for inherit type generation from supabase
  const { data, error } = await supabase
    .from("projects")
    .insert([{
      title: formData.title,
      description: formData.description,
      user_id: user.id,
      user
    }])
    .select();

  if (error || !data.length) {
    // console.log("er", error);
    throw new Error("The project could not be created.");
  } else {
    const newProjectID = data[0]?.id;
    // console.log(newProjectID, "d", newProjectID);
    revalidateTag("/projects");
    redirect(`/projects/${newProjectID}`);
  }
};

export const updateProject = async (
  formData: ProjectFormUpdate,
  projectID: string
) => {
  const supabase = createClient();
  const validatedFields = projectSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, error } = await supabase
    .from("projects")
    .update(formData)
    .eq("id", projectID)
    .select();

  if (error || !data.length) {
    console.log("er", error);
    throw new Error("The project could not be updated.");
  } else {
    revalidatePath(`/projects/${projectID}`);
  }
};

export const uploadFileToProject = async (
  file: File,
  filePath: string,
  projectID: string
) => {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("assets")
    .upload(filePath, file as File);
  // console.log("upd error", error);
  if (error) throw new Error("Error uploading file");
  revalidatePath(`/projects/${projectID}`);
};

export const getProjectFiles = async (projectID: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("assets").list(projectID);
  if (error) throw new Error("Error fetching files");
  return data;
};

export const getUserWithEmail = async (email: string):Promise<{ data: User; error: any }> => {
  const supabase = createClient()
  const {data, error} = await supabase.from("users").select("*").eq("email", email)
  if (error) throw new Error("Error fetching files");
  return {data: data[0], error};
}