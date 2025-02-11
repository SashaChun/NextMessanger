import prisma from "../libe/prismadb.js";
import getSession from "./getSession.js";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session || !session.user || !session.user.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        return currentUser || null;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
};

export default getCurrentUser;
