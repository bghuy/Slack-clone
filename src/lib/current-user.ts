import { auth } from "@/auth";
import { db } from "./db";
export const currentUser = async () =>{
    try {
        const session = await auth();
        if(!session || !session.user) return null
        const {id} = session?.user;
        if(!id) return null
    
        const user = await db.user.findUnique({
            where:{
                id: id
            }
        })
        console.log(user,"user");
        console.log(session.user,"session user");
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}