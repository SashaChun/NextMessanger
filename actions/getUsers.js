import prisma from "../libe/prismadb.js";

import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession();

    if (!session || !session.user || !session.user.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return users;
    } catch (error) {
        return [];
    }
};

export default getUsers;
