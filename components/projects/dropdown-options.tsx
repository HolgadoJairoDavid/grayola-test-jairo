import {
    Ellipsis,
    Trash
  } from "lucide-react";
  import React from "react";
  
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    // DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    // DropdownMenuSub,
    // DropdownMenuSubContent,
    // DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { removeProject } from "@/app/projects/actions";
  import { toast } from "sonner";
  
  interface DropdownProjectOptionsProps {
    projectID: string;
    deleteProject: (id: string) => void;
  }
  
  const DropdownProjectOptions: React.FC<DropdownProjectOptionsProps> = ({ projectID, deleteProject }) => {
    const handleProjectDelete = async () => {
      try {
        await removeProject(projectID);
        deleteProject(projectID)
        toast.success("Success", {
          description: "The project has been deleted successfully!",
        });
      } catch (error) {
        toast.error("Error", {
          description: "The project could not be deleted.",
        });
      }
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="w-fit border-none h-fit hover:bg-slate-100 p-1 absolute right-2 top-2"
        >
          <Button variant="outline" className="p-1">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-[#ff2427] cursor-pointer"
            onClick={handleProjectDelete}
          >
            <Trash className="mr-2 h-4 w-4 " />
            <span>Delete</span>
            {/* <DropdownMenuShortcut>X</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default DropdownProjectOptions;