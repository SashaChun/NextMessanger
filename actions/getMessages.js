import prisma from '../libe/prismadb.js'

async function getMessages(){
    try {
        const messages = await prisma.message.findMany({
            where : {
                conversationId : conversationId
            },
            include : {
                sender : true,
                seen : true
            },orderBy : {
                createdAt : 'asc'
            }
        })

        return messages
    }catch (error){
        return [];
    }
}

export default getMessages;