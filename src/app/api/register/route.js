import { NextResponse } from "next/server";
import prisma from "../../../../libe/prismadb"; // Шлях може відрізнятись
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse("Missing info", { status: 400 });
        }

        // Перевірка наявності користувача з таким email
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 });
        }

        const  hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { email, name,  hashedPassword},
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error, "REGISTRATION_ERROR");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
