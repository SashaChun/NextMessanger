import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/', // Вказуємо сторінку для входу
    },
});

export const config = {
    matcher: ['/chats'], // Маршрути, до яких застосовується middleware
};
