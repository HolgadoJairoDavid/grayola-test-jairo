import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Plus } from "lucide-react";
  import Link from "next/link";
  
  const CardCreation = () => {
    return (
      <div className="max-w-64 ">
        <Card className="flex flex-col items-center bg-green-bright hover:bg-slate-100 h-fit w-full">
          <CardHeader>
            <CardTitle>Add new project</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-5 text-black">
            Add a new project, and top designers will be assigned to you
            </CardDescription>
          </CardContent>
          <CardFooter className="hover:scale-110 transition-colors duration-600 ease">
            <Link
              href="/projects/create"
              className="rounded-full w-10 h-10 p-0 bg-black 
            cursor-pointer pointer-events-auto
            flex items-center justify-center"
              aria-label="create a new project"
            >
              <Plus className="text-white w-5 h-5" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default CardCreation;