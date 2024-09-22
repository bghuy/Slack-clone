'use server'
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
// import { redirect } from 'next/navigation';
type LoginResponse = { success?: string; error?: string };
export const login = async(values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {

    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return({ error: "Login failed!" });
    }
    const {email , password } = validatedFields.data;
    try {
        await signIn("credentials",{
            email,
            password,
            // redirectTo: DEFAULT_LOGIN_REDIRECT,
            redirect: false
        })
        console.log("pass");
        if (validatedFields.success) {
            console.log("redirect");
            return({ success: "Login successfully!" });
            // redirect(DEFAULT_LOGIN_REDIRECT);
            console.log("pass redirect");
        }
        return({ success: "Login successfully!" });
    } catch (error) {
        console.log(error, "error");
        
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!"}
                default:
                    return { error: "Something went wrong!"}
            }
        }
        throw error;
        // redirect("/auth/login")
        
    }
        

}