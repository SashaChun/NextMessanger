import prisma from '../libe/prismadb.js';

async function getMessages(conversationId) {
    try {
        console.log('Fetching messages for conversationId:', conversationId); // Логування ID

        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId // фільтруємо по conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc' // порядок за часом
            }
        });

        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

export default getMessages;
