import { getServerSession } from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import prisma from "../libe/prismadb";

export async function getCurrentUser() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return null;

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        // Якщо користувача не знайдено
        if (!currentUser) {
            console.error("Користувача не існує");
            return null;
        }

        // Якщо updatedAt є null, встановіть поточну дату
        if (currentUser.updatedAt === null) {
            await prisma.user.update({
                where: { id: currentUser.id },
                data: { updatedAt: new Date() },
            });
        }

        return currentUser;
    } catch (error) {
        console.error("Помилка в getCurrentUser:", error);
        return null;
    }
}