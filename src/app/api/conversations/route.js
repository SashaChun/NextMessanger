import getCurrentUser from "../../../../actions/getCurrantUser.js";
import { NextResponse } from "next/server";
import prisma from "../../../../libe/prismadb.js";
import {pusherServer} from "../../../../libe/pucher.js";

export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map(member => ({ id: member.value })),
                            { id: currentUser.id }
                        ]
                    }
                },
                include: { users: true }
            });

            newConversation.users.forEach((user)=>{
                if(user.email){
                    pusherServer.trigger(user.email , 'conversation:new' , newConversation)
                }
            })

            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma.conversation.findFirst({
            where: {
                userIds: { equals: [currentUser.id, userId] }
            }
        });

        if (existingConversations) {
            return NextResponse.json(existingConversations);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id: currentUser.id }, { id: userId }]
                }
            },
            include: { users: true }
        });
        newConversation.users.map((user)=>{
            if(user.email){
                pusherServer.trigger(user.email , 'conversation:new' , newConversation)
            }
        })

        return NextResponse.json(newConversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
