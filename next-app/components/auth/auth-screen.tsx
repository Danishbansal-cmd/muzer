"use client"

import { SignInFlow } from "@/types/auth-types";
import { useState } from "react";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";


export default function AuthScreen({authType} : {authType? : SignInFlow}){
    const [formType, setFormType] = useState<SignInFlow>(authType || "signIn");
    return (
        <div className="w-full min-h-screen flex items-center justify-center gap-5 bg-gradient-to-b  from-purple-900 to-gray-900">
            <div className="w-full md:h-auto md:w-[420px] px-4">
                {formType == "signIn" ? 
                    <SignInCard setFormType={setFormType} />
                :
                    <SignUpCard setFormType={setFormType} />
                }
            </div>
        </div>
    );
}