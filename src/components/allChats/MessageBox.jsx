"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Image from "next/image";
import noPhotoPic from '../sideBar/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg';
import { FaRegPaperPlane } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';

const MessageBox = ({ data, selected, find }) => {
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/chats/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];
        if (!userEmail) {
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return "Sent an image";
        }
        if (lastMessage?.body) {
            return lastMessage.body;
        }
        return "Started a conversation";
    }, [lastMessage]);

    return (
        <div
            onClick={handleClick}
            className={'flex justify-start items-center hover:bg-[#141416] p-[15px] flex-row space-x-2'}
        >
            <Image
                src={data.photo || noPhotoPic}
                className={'w-[48px] border-2 border-gray-800 h-[48px] rounded-[100%] bg-white flex-shrink-0'}
                alt="image"
            />
            <div className={'flex flex-col w-[100%]'}>
                <div className={'flex justify-between'}>
                    <p>{data.users[0].name}</p>
                    <p>{formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}</p>
                </div>
                <div className="w-full relative overflow-hidden">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {!find && lastMessageText}
                    </p>
                </div>
            </div>
            <div>
                {find && <FaRegPaperPlane />}
            </div>
        </div>
    );
};

export default MessageBox;
