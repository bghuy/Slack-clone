'use server'
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
type RegisterResponse = { success?: string; error?: string };

export const register = async(values: z.infer<typeof RegisterSchema>): Promise<RegisterResponse> => {
    return new Promise((resolve, reject) => {
        const validatedFields = RegisterSchema.safeParse(values);
        setTimeout(() => {
            if (!validatedFields.success) {
                reject({ error: "Register failed!" });
            } else {
                resolve({ success: "Register successfully!" });
            }
        }, 1000);
    });
}