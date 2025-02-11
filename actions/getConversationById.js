import prisma from '../libe/prismadb.js';
import getCurrentUser from "./getCurrantUser.js";

export default async function getConversationById(conversationID) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.email) {
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationID
            },
            include: {
                users: true
            }
        });

        return conversation;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        return null;
    }
}
