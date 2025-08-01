"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

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
                router.push('/home')
            }}
                className={`flex flex-col justify-center text-lg font-bold hover:cursor-pointer ${showThemeSwitch ? "" : 'text-white'}`}>
                Muzer
            </div>
            <div className="flex items-center gap-x-2">
                {isSpectator && <WalletMultiButton />}
                {session.data?.user && 
                    <Button 
                    className="bg-purple-600 text-white hover:bg-purple-700" 
                    onClick={() => signOut({callbackUrl: "/"})}>
                        Sign Out
                    </Button>
                }
                {!session.data?.user && 
                    <div className="space-x-3">
                        <Button 
                        className="bg-purple-600 text-white hover:bg-purple-700" 
                        onClick={() => router.push('/auth')}>
                            Sign In
                        </Button>
                        <Link href={{
                            pathname: "/auth",
                            query: {
                                authType: "signUp"
                            }
                        }}>
                            <Button 
                                variant={"ghost"}
                                className="bg-purple-600 text-white hover:bg-purple-700"
                            >
                                SignUp
                            </Button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}