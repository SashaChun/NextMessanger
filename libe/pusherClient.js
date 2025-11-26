'use client';

import PusherClient from 'pusher-js';

// Налаштування Pusher для клієнтської частини
export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '',
    { cluster: 'eu' }
);
