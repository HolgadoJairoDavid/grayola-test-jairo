"use client";

import ButtonCreation from "@/components/projects/button-creation";
import ProjectsContainer from "@/components/projects/projects-container";
import { getAllProjects, getUserWithEmail } from "./actions";
import { useEffect, useState} from "react";
import { getUser } from "../login/actions";
import { Project } from "../types";

export default function Page() {

  // const [projects, setProjects ] = useState<Project[]>([]);
  const deleteProject = (id: string) =>{
    setProjects(projects.filter((element: Project) => element?.id != id))
  }

  const [user, setUser] = useState({ id: "", email: "", role: "" });
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
        const response = await getAllProjects(data?.role || "");
        
        // Error handling when fetching projects
        if (response.error) {
          console.error('Error retrieving projects:', response.error);
          return;
        }

        setProjects(response.data);
      } catch (err) {
        console.error('Error in fetchProjects:', err);
      }
    };

    fetchProjects();
  }, []);
  
  return (
    <div
      className="w-full flex flex-col items-end gap-8 max-w-7xl h-full
    px-8 mt-36"
    >
      <ButtonCreation />
      <ProjectsContainer projects={projects} deleteProject={deleteProject} role={user?.role}/>
    </div>
  );
}