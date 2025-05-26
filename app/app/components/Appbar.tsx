"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function AppBar() {
    const session = useSession();
    return (
        <div className="w-full">
            <div className="flex justify-between">
                <div>
                    Muzi
                </div>
                <div>
                    {
                        !session.data?.user
                            ?
                            <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>Sign In</button>
                            :
                            <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>Sign Out</button>}
                </div>
            </div>
        </div>
    );
}