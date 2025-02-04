import { getCurrentUser } from "../../../../actions/getCurrantUser";
import { NextResponse } from "next/server";
import prisma from '../../../../libe/prismadb'

// src/app/api/conversation/route.js

// ... інші імпорти

export async function POST(request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid group data', { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    userIds: [...members.map(member => member.value), currentUser.id],
                    users: {
                        connect: [
                            ...members.map(member => ({ id: member.value })),
                            { id: currentUser.id }
                        ]
                    }
                },
                include: { users: true }
            });
            return NextResponse.json(newConversation);
        }

        // Пошук існуючих індивідуальних бесід
        const existingConversations = await prisma.conversation.findMany({
            where: {
                AND: [
                    { userIds: { has: currentUser.id } },
                    { userIds: { has: userId } },
                    { isGroup: false }
                ]
            },
            include: { users: true }
        });

        const singleConversation = existingConversations[0];
        if (singleConversation) return NextResponse.json(singleConversation);

        // Створення нової бесіди
        const newConversation = await prisma.conversation.create({
            data: {
                userIds: [currentUser.id, userId],
                users: {
                    connect: [
                        { id: currentUser.id },
                        { id: userId }
                    ]
                }
            },
            include: { users: true }
        });

        return NextResponse.json(newConversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}