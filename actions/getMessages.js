async function getMessages(conversationId) {
    try {
        console.log('Fetching messages for conversationId:', conversationId);

        const { default: prisma } = await import('../libe/prismadb.js');
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
