import ChatId from './ componets/ChatId.jsx';
import getConversationById from "../../../../actions/getConversationById.js";
import getMessages from "../../../../actions/getMessages.js";

export default async function Chat({ params }) {
    const { chat } = await params; // Next.js 15 вимагає await для params
    const conversation = await getConversationById(chat); // отримуємо розмову за ID
    console.log('conversation.id', conversation.id);

    // Ось тут передаємо правильно conversation.id
    const messages = await getMessages(conversation.id);
    console.log('messages', messages);

    return (
        <div>
            <ChatId message={messages} conversations={conversation} />
        </div>
    );
}
