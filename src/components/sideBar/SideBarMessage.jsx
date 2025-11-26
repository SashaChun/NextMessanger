import MessageBox from '../allChats/MessageBox.jsx';
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "../../../libe/pusherClient.js";

export default function SideBarMessage({ conversations = [] }) { // Додаємо значення за замовчуванням
    const { data: session } = useSession();
    const [conversationsList, setConversationsList] = useState(conversations);

    // Отримуємо унікальний ключ для підписки на Pusher
    const pusherKey = useMemo(() => {
        return session?.user?.email || null;
    }, [session?.user?.email]);

    useEffect(() => {
        console.log("📢 conversationsList:", conversationsList);
    }, [conversationsList]);

    useEffect(() => {
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation) => {
            setConversationsList((prev) => [...prev, conversation]);
        };

        pusherClient.bind('conversation:new', newHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler);
        };
    }, [pusherKey]); // Додано залежність

    return (
        <div className="flex h-[60vh] flex-col">
            <p className="text-2xl p-[15px]">Messages</p>
            <div>
                {conversationsList.length > 0 ? (
                    conversationsList.map((event, index) => {
                        if (!event.users || event.users.length === 0) {
                            return null; // або placeholder, якщо user не знайдений
                        }
                        return (
                            <MessageBox
                                key={event.id || index}
                                find={false}
                                lastMessage="hallow"
                                name={event.users[0].name || "Unknown"}
                                data={event}
                            />
                        );
                    })
                ) : (
                    <p className="flex items-center justify-center h-[50vh]">No messages</p>
                )}

            </div>
        </div>
    );
}
