"use client"; // it is used with recoil, themeProvider
import { SessionProvider } from "next-auth/react";
import {ThemeProvider as NextThemesProviders, type ThemeProviderProps} from "next-themes";

export function Providers({children} : {
    children : React.ReactNode
}){
return (
    <SessionProvider>
        {children}
    </SessionProvider>
);
}

export function ThemeProvider({children, ...props} : ThemeProviderProps){
    return <NextThemesProviders {...props}>{children}</NextThemesProviders>
}