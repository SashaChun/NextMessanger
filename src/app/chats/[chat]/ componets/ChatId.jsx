"use client";

import Image from "next/image";
import addChat from "../../../../../public/Group.png";
import dots from "../../../../../public/more-2-line.png";
import skrepka from "../../../../../public/gje.png";
import smile from "../../../../../public/emotion-happy-line.png";
import lupa from "../../../../../public/Vector.png";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ContactInfo from "@/components/allChats/ContactInfo.jsx";
import ChatItem from "@/components/allChats/ChatItem.jsx";
import { signOut } from "next-auth/react";
import noPhotoPic from "../../../../components/sideBar/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg";
import { FaRegPaperPlane } from "react-icons/fa";
import axios from "axios";
import Message from "../../../../components/allChats/ChatItem.jsx";
import { IoMdPhotos } from "react-icons/io";
import Form from "./Form.js";
import { motion, AnimatePresence } from "framer-motion";
import { pusherClient } from '../../../../../libe/pusherClient.js';

export default function ChatId({ conversations, message }) {
    const pathName = usePathname();
    const [leftWidth, setLeftWidth] = useState(25);
    const [rightWidth, setRightWidth] = useState(20);
    const isResizingLeft = useRef(false);
    const isResizingRight = useRef(false);
    const [showInfo, setShowInfo] = useState(false);
    const [messages, setMessages] = useState(message);

    const handleMouseMove = (e) => {
        if (isResizingLeft.current) {
            const newWidth = (e.clientX / window.innerWidth) * 100;
            setLeftWidth(Math.min(Math.max(newWidth, 10), 50));
        }
        if (isResizingRight.current) {
            const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
            setRightWidth(Math.min(Math.max(newWidth, 10), 50));
        }
    };

    const handleMouseUp = () => {
        isResizingLeft.current = false;
        isResizingRight.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    useEffect(() => {
        pusherClient.subscribe(conversations.id);

        const messageHandler = (message) => {
            setMessages((current) => {
                if (current.find(msg => msg.id === message.id)) {
                    return current; // Якщо повідомлення вже є, не додаємо нове
                }
                return [...current, message];
            });
        };

        pusherClient.bind('messages:new', messageHandler);

        // Очистка після відписки
        return () => {
            pusherClient.unsubscribe(conversations.id);
            pusherClient.unsubscribe('messages:new');
        };
    }, [conversations.id]);

    const handleMouseDown = (side) => {
        if (side === "left") isResizingLeft.current = true;
        if (side === "right") isResizingRight.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const show = (event) => setShowInfo(event);

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: '/' });
    };

    const lastSegment = pathName.split('/').filter(Boolean).pop();

    return (
        <div className="flex justify-between h-screen">
            <div className={`flex flex-1 flex-col justify-between transition-all duration-300 ${showInfo ? 'pr-[20%]' : ''}`}>
                <div className={'flex justify-between items-center bg-[#2a2c33]'}>
                    <div className={'flex flex-row items-center space-x-3 px-[20px] py-[10px]'}>
                        <Image src={conversations.users[0].image || noPhotoPic} className={'w-[48px] border-2 border-gray-800 h-[48px] rounded-[100%] bg-white flex-shrink-0'} alt="image" />
                        <p>{conversations.users[0].name}</p>
                    </div>
                    <div>
                        <div onClick={() => show(true)} className={'flex space-x-3 flex-row hover:bg-[#25262d] opacity-80 items-center justify-center p-3 rounded-[100%]'}>
                            <Image src={dots} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]" />
                        </div>
                    </div>
                </div>

                <div className={'px-10 scroll-container h-full py-5'}>
                    <p className={'text-gray-600-300 text-center mt-4'}>Yesterday</p>
                    {messages.map((msg, index) => (
                        <Message key={index} data={msg} isLast={index === messages.length - 1} />
                    ))}
                </div>
                <Form lastSegment={lastSegment} />
            </div>
            <div className="w-[2px] bg-[#2b2c2f] cursor-col-resize" onMouseDown={() => handleMouseDown("right")} />
            <AnimatePresence>
                {showInfo && (
                    <motion.div
                        key="contact-info"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                            mass: 0.8,
                        }}
                        className="absolute right-0 top-0 h-full w-[20%] bg-[#2a2c33]"
                    >
                        <ContactInfo Close={() => setShowInfo(false)} conversations={conversations} currentUser={''} rightWidth={rightWidth} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
