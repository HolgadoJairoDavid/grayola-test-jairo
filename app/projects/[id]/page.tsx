import EditProjectForm from "@/components/projects/project/form";
import { getProject } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

const ProjectDetailsPage = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);
  // console.log(project);
  return (
    <div
      className="border rounded-md mt-36 mb-4
    p-8 w-full h-full max-w-7xl flex flex-col gap-8 flex-grow w-full"
    >
      <EditProjectForm project={project} />
      <Card className="flex gap-3 items-center border-none justify-center p-2 bg-slate-100">
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-bold items-center flex gap-2">
            <Info className="w-5" />
            <span>Info</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="p-0 text-black">
            Currently the <strong>update permissions</strong> are only available
            to the <strong>project manager</strong>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage;