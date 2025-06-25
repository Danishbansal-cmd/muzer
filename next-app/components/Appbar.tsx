"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AppBar({ showThemeSwitch = false, isSpectator = false }: {
    showThemeSwitch: boolean,
    isSpectator?: boolean
}) {
    const session = useSession();
    const router = useRouter();

    return (
        <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
            <div 
            onClick={() => {
                router.push('/home');
            }}
                className={`flex flex-col justify-center text-lg font-bold hover:cursor-pointer ${showThemeSwitch ? "" : 'text-white'}`}>
                Muzer
            </div>
            <div className="w-full">
                <div className="flex justify-between px-20">
                    <div className="text-lg font-bold flex flex-col justify-center text-white">

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
        </div>
    );
}