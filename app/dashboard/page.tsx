"use client";

import React from "react"
import { useEffect, useState } from "react"
import { getAllUsers, updateUser } from "./actions"
import { getUser } from "../login/actions";
import { User } from "../types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { ChangeEvent } from 'react';

export default function Dashboard(){
    const [users, setUsers] = useState<any[]>([])
    const [userCurrent, setUser] = useState<User | null>(null); 
    useEffect(()=>{
        async function fetchAllUsers (){
            const fetchedUsers = await getAllUsers();
            const fetchCurrentUser = await getUser();
            setUser({
                id: fetchCurrentUser.id || "",
                email: fetchCurrentUser.email || "", 
            });
            setUsers(fetchedUsers || [])
        }
        
        fetchAllUsers()
    }, [])
    if (!userCurrent) return null;
    if (
        userCurrent?.email !== "admingrayola@grayola.io"
    ) {
        return null
    }

    interface RoleChangeEvent {
        value: string
    }

    const handleRole = async (value: string, email: string) => {
        try {
            await updateUser({
                role: value,
                email: email
            });
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    }
    return(
        <div className="mt-36 w-full">
            <div className="border-b-2 pl-10 pb-6">
            <h1 className="text-slate-900 text-3xl font-medium">Dashboard</h1>
            </div>
            <div>
                <div className="flex justify-between w-1/2 mt-4 mb-6 mx-auto border-none text-xl text-slate-950 font-medium"> 
                <p className="px-6">Email</p>
                <p className="px-6">Role</p>
                </div>
                {
                    users?.map((user)=> (
                        <Card className="flex justify-between items-center shadow-md text-center w-1/2 mx-auto mb-4">
                            <CardHeader>
                                <p className="bg-slate-200 text-slate-900 w-96 p-1 rounded-md">{user?.email}</p>
                            </CardHeader>
                               
                            <Select onValueChange={(value: string)=>handleRole(value, user?.email)} defaultValue={user?.role}>
                                <SelectTrigger className="w-[180px] mr-6">
                                    <SelectValue placeholder={user?.role} />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem className="hover:cursor-pointer" value="client">Client</SelectItem>
                                    <SelectItem className="hover:cursor-pointer" value="project_manager">Project Manager</SelectItem>
                                    <SelectItem className="hover:cursor-pointer" value="designer">Designer</SelectItem>
                                </SelectContent>
                            </Select>

                        </Card>
                    ))
                }
            </div>
        </div>
    )
}