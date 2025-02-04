import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "../libe/prismadb"; // Переконайтеся, що шлях правильний

export async function getUsers() {
    // Отримуємо серверну сесію
    const session = await getServerSession(authOptions);

    // Перевіряємо, чи є email у сесії
    if (!session?.user?.email) {
        return null;
    }
    try {
        // Отримуємо список користувачів, виключаючи поточного користувача
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                NOT: {
                    email: session.user.email,
                }
            },
        });

        return users || null;
    } catch (err) {
        console.error("Помилка при отриманні користувачів:", err);
        return null;
    }
}