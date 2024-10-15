'use client'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FileUpload } from "../file-upload"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useModal } from "../../../hooks/use-modal-store"
import { useEffect } from "react"

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1,{
        message: "Server image is required"
    })
})

export const EditServerModal = () =>{
    const {isOpen, onClose , type, data} = useModal();
    const router = useRouter()
    
    const isModalOpen = isOpen === true && type === "EditServer";
    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            imageUrl: ""
        }
    })

    useEffect(() => {
        if (data?.server) {
            const { name, image } = data.server;
            form.setValue("name", name || "");
            form.setValue("imageUrl", image || "");
        }
    }, [data, form])
    const isLoading = form.formState.isSubmitting;
    const submitForm = async (values: z.infer<typeof formSchema>) =>{
        try {
            const server = await axios.patch(`/api/servers/${data?.server?.id}`,values)
            console.log(server);
            router.refresh();
            handleClose()
            // window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClose = ()=>{
        form.reset();
        onClose();
    }

    return( 
        <Dialog open = {isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image, You can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(submitForm)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint= "serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel
                                            className=" uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}