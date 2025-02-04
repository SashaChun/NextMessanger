import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/', // Вказуємо сторінку для входу
    },
    async onBeforeRequest(req) {
        console.log("Middleware triggered", req.nextUrl.pathname);

        if (req.nextUrl.pathname.startsWith('/chats') && !req.cookies['next-auth.session-token']) {
            console.log("User is not authenticated");
        }

        return req;
    }
});

export const config = {
    matcher: ['/chats/:path*'],
};
