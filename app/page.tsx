import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CardCreation from "@/components/projects/card-creation";

export default async function Index() {
  return (
    <section className="flex gap-20 items-center max-w-7xl px-8 mt-32">
      <div>
      <div className="max-w-4xl flex md:flex-row flex-col gap-2 items-center mb-8 justify-center">
        <h1 className="font-bold md:text-3xl text-2xl text-black text-center">
          <div className="mb-4">
          A versatile {" "}
          <span className="bg-green-200">team  ready</span> to engage
          </div>
          
          with projects of {" "}
          <span className="bg-red-200">all dimensions</span>
        </h1>
      </div>
      <div className="flex gap-4 md:flex-row flex-col">
        <CardCreation />
        <Card className="hover:bg-slate-100">
          <Link href={"/projects"}>
            <CardHeader>
              <CardTitle className="text-black md:text-2xl text-xl">
                View my projects
              </CardTitle>
              <CardContent className="flex items-center gap-4 p-0">
                <CardDescription className="text-base text-black text-sm">
                View all the projects we are actively developing
                </CardDescription>
                <ArrowRight className="w-12 h-12 text-black hover:scale-110 transition-colors duration-500 ease" />
              </CardContent>
            </CardHeader>
          </Link>
        </Card>

      </div>
      </div>
        <div className="hidden md:block">
        <Image src="/cuervi.svg" alt="" width={600} height={600} className="pt-[25%] pl-[10%] pr-[10%]"/>
        </div>
    </section>
  );
}