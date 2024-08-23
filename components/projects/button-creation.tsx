import { Button } from "../ui/button";
import Link from "next/link";

const ButtonCreation = () => {
    return (
        <div>
                
            <Link
              href="/projects/create"
              className="rounded-full
              cursor-pointer pointer-events-auto items-center justify-center"
              aria-label="create a new project"
            >
              <Button className="bg-slate-950 text-slate-50 hover:bg-slate-900 mb-4">
                Add New Project
            </Button>
            </Link>
        </div>
    )
}

export default ButtonCreation;