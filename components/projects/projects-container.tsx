"use client";
import { Project } from "@/app/types";
import { LayoutGrid, ListIcon, Activity} from "lucide-react";
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Combobox } from "../ui/combobox";
import DropdownOptions from "./dropdown-options";
import Link from "next/link";
import { Button } from "../ui/button";
// import { ArrowRight } from "lucide-react";

interface ProjectsContainerProps {
  projects: Project[] | null;
}
const ProjectsContainer: React.FC<{
  projects: Project[];
  deleteProject: (id: string) => void;
  role: string
}>= ({ projects, deleteProject, role }) => {
  const [gridProjects, setGridProjects] = useState(true)

  const handleGridProjects = () => {
    setGridProjects((prev) => !prev)
  }
  const timeAgo = (date: string): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
  
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
  
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
  
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
  
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
  
    return `${seconds} seconds ago`;
  };
  return (
    <div className="w-full">
      <div className="flex relative bottom-20 border-[1px] p-1 border-slate-200 w-fit rounded-xl">
      <Button disabled={gridProjects} onClick={handleGridProjects} className={gridProjects ? "disabled:bg-slate-200" : ""}>
      <LayoutGrid className="scale-90 text-slate-600 hover:text-slate-900"/>
      </Button>
      <Button disabled={!gridProjects} onClick={handleGridProjects} className={!gridProjects ? "disabled:bg-slate-200" : ""}>
      <ListIcon className="scale-90 text-slate-600 hover:text-slate-900" />
      </Button>
      </div>
      <div className="flex flex-wrap gap-8 w-full">
      {gridProjects && projects?.map((project) => (
        <Card key={project.id} className="w-64 relative">
          <p className="flex text-sm pl-6 pt-2 w-fit gap-2"><Activity className="text-slate-500 scale-75" /> {timeAgo(project.created_at || "")}</p>
          <CardHeader className="pb-4 pt-4">
            <Link
              href={`/projects/${project.id}`}
              className="flex flex-wrap hover:underline hover:underline-offset-1"
            >
              <CardTitle className="text-xl">{project.title}</CardTitle>
              {/* <ArrowRight className="w-8 -rotate-45"/> */}
            </Link>
            {role === "project_manager" && <DropdownOptions projectID={project.id || ""} deleteProject={deleteProject}/>}
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-5 text-slate-500 font-light">
              {project.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-start">
            {/* <p className="truncate text-sm text-slate-800 font-light">{project.user?.email}</p> */}
            {/* <div className="flex items-center space-x-4">
              <p className="text-sm ">Designers</p>
              <Combobox />
            </div>  */}
          </CardFooter>
        </Card>
      ))}
     { !gridProjects && <div className="w-full">
      {
        !gridProjects && projects?.map((project) => (
         <div>
            <p className="text-sm pl-1 pt-2 pb-2 flex gap-2">{timeAgo(project.created_at || "")} <Activity className="text-slate-500 scale-90 border-2 p-[3px] rounded-full" /></p>
           <Card key={project.id} className="w-full relative mb-2">
            <CardHeader className="pb-4 pt-4">
              <Link
                href={`/projects/${project.id}`}
                className="flex flex-wrap hover:underline hover:underline-offset-1"
              >
                <CardTitle className="text-xl">{project.title}</CardTitle>
                {/* <ArrowRight className="w-8 -rotate-45"/> */}
              </Link>
              {role === "project_manager" && <DropdownOptions projectID={project.id || ""} deleteProject={deleteProject}/>}
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-5 text-slate-500 font-light">
                {project.description}
              </CardDescription>
            </CardContent>
          </Card>
         </div>
        ))
      }
      </div>}
    </div>
    </div>
  );
};

export default ProjectsContainer;