import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// Налаштування Pusher для серверної частини
export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    useTLS: true
});

// Налаштування Pusher для клієнтської частини
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: 'eu'
});
