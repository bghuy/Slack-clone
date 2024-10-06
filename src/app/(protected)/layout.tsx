// import { ModeToggle } from "@/components/mode-toggle";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
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
                <SocketProvider>
                    <ModalProvider/>
                    {children}
                </SocketProvider>
            </ThemeProvider>

            
        </div>
     );
}
 
export default ProtectedLayout;