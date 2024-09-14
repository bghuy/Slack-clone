'use client'
import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "@/schemas"
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "../../../actions/login"
import { useState, useTransition } from "react"
export const LoginForm = () =>{
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("")
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const submitForm = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
            login(values)
                .then((data)=>{
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form 
                    action="" 
                    onSubmit={form.handleSubmit((values)=>{submitForm(values)})}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button 
                        className="w-full"
                        type="submit"
                        disabled={isPending}
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}