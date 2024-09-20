'use server'
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";


type RegisterResponse = { success?: string; error?: string };

export const register = (values: z.infer<typeof RegisterSchema>): Promise<RegisterResponse> => {
    return new Promise(async (resolve, reject) => {
        // Wrap the entire logic inside setTimeout
        setTimeout(async () => {
            const validatedFields = RegisterSchema.safeParse(values);

            if (!validatedFields.success) {
                return resolve({ error: "Register failed!" });
            }

            const { email, password, name } = validatedFields.data;

            try {
                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Check if the user already exists
                const existingUser = await getUserByEmail(email);

                if (existingUser) {
                    return resolve({ error: "Email already in use!" });
                }

                // Create a new user
                await db.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword
                    }
                });

                // TODO: Send verification token email
                return resolve({ success: "Register successfully!" });
            } catch (error) {
                console.error("Registration error:", error);
                return resolve({ error: "Register failed!" });
            }
        }, 1000);
    });
};
