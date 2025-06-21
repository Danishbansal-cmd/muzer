"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function AppBar() {
    const session = useSession();
    return (
        <div className="w-full">
            <div className="flex justify-between px-20">
                <div className="text-lg font-bold flex flex-col justify-center text-white">
                    Muzer
                </div>
                <div>
                    {
                        !session.data?.user
                            ?
                            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signIn()}>Sign In</Button>
                            :
                            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => signOut()}>Sign Out</Button>}
                </div>
            </div>
        </div>
    );
}