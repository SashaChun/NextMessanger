import PusherServer from 'pusher';

// Налаштування Pusher для серверної частини
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: 'eu',
    useTLS: true
});
