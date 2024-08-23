import CreateProjectForm from "@/components/projects/create/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Info } from "lucide-react";
const CreateProjectPage = () => {
  return (
    <div className="max-w-7xl flex-grow flex w-full flex-col gap-8 px-8">
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <Separator />
          <CardDescription>
            By creating a new project with us you make sure that will be
            attended by the best
          </CardDescription>
        </CardHeader>
      </Card>
      <CreateProjectForm />
      <Card className="flex gap-3 items-center justify-center p-2 border-none bg-slate-100">
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-bold items-center flex gap-2">
            <Info className="w-5" />
            <span>Info</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="p-0 text-black">
            Currently the <strong>creat permissions</strong> are only available
            to the <strong>client</strong>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProjectPage;