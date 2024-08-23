import { z } from "zod";
import { projectSchema } from "./schemas";

export interface Project {
  id?: string;
  title?: string;
  description?: string;
  user_id?: string;
  created_at?: string;
  project_manager_id?: string;
  designer_ids?: Array<string>;
  user?: User;
  project_manager?: User;
}

export type ProjectForm = z.infer<typeof projectSchema>;
export type ProjectFormUpdate = Partial<ProjectForm>;

export interface User {
  id?: string;
  email?: string;
  role?: string;
}