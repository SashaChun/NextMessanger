import MessageBox from "../allChats/MessageBox.jsx";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "../../../libe/pucher.js";
import {find} from "loadsh/collection.js";

export default function SideBarMessage({ conversations }) {
    const { data: session } = useSession(); // Отримуємо поточного користувача

    const [conversationsList, setConversationsList] = useState(conversations);

    // Створюємо ключ для підписки
    const pusherKey = useMemo(() => {
        return session?.user?.email; // Переконаємося, що дані існують
    }, [session?.user?.email]);

    useEffect(() => {
        if (!pusherKey) return; // Якщо користувача немає, не підписуємося

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation) => {
            setConversationsList((current) => {
                if (find(current, { id: conversation.id })) {
                    return current; // Якщо вже є — не додаємо
                }
                return [conversation, ...current];
            });
        };

        pusherClient.bind("conversation:new", newHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind("conversation:new", newHandler);
        };
    }, [pusherKey]);

    return (
        <div className="flex h-[60vh] flex-col">
            <p className="text-2xl p-[15px]">Messages</p>
            <div>
                {conversationsList.length > 0 ? (
                    conversationsList.map((event, index) => (
                        <MessageBox
                            key={index}
                            find={false}
                            lastMessage={"hallow"}
                            name={event.users[0].name}
                            data={event}
                        />
                    ))
                ) : (
                    <p className="flex items-center justify-center h-[50vh]">No messages</p>
                )}
            </div>
        </div>
    );
}
