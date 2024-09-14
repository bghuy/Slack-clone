'use server'
import * as z from "zod"
import { LoginSchema } from "@/schemas";
type LoginResponse = { success?: string; error?: string };

export const login = async(values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
        const validatedFields = LoginSchema.safeParse(values);
        setTimeout(() => {
            if (!validatedFields.success) {
                reject({ error: "invalid fields" });
            } else {
                resolve({ success: "Email sent!" });
            }
        }, 1000);
    });
}