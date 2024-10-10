import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string
    }
}

const ChannelIdPage = async({
    params
}: ChannelIdPageProps) => {
    const user = await currentUser();
    if(!user) return redirect("/auth.login")
    
    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    })
    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            userId: user.id
        }
    });

    if(!channel || !member) return redirect("/")

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <div className="flex-1">
                Future Messages
            </div>
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId
                }}
            />
        </div>
    );
}
 
export default ChannelIdPage;