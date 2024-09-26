// import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import React from "react";

const ProtectedLayout = ({children}:{children: React.ReactNode}) => {
    return ( 
        <div className={cn(
            "h-full",
            "bg-white dark:bg-[#313338]"
        )} >
            <ThemeProvider
                attribute= "class"
                defaultTheme= "dark"
                enableSystem= {false}
                storageKey="discord-theme"
            >
                {/* <ModeToggle/> */}
                {children}
            </ThemeProvider>
        </div>
     );
}
 
export default ProtectedLayout;