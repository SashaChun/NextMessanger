'use client'

import Image from "next/image";
import noPhotoPic from '../sideBar/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg'
 import { useRouter } from 'next/navigation';
import {useCallback, useState} from "react";
import axios from "axios";
import { FaRegPaperPlane } from "react-icons/fa";

export default function UsersBox({ lastMessage, photo, name , find , data}) {
    const router = useRouter();


     const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: data.id
        })
            .then((data) => {
                router.push(`/chats/${data.data.id}`);
            })
            .finally(() => setIsLoading(false));
    }, [data, router]);

    return (
        <div onClick={handleClick} className={'flex justify-start items-center hover:bg-[#141416] p-[15px] flex-row space-x-2'}>
            <Image
                src={photo || noPhotoPic}
                className={'w-[48px] border-2 border-gray-800 h-[48px] rounded-[100%] bg-white flex-shrink-0'}
                alt="image"
            />
            <div className={'flex flex-col w-[100%] '}>
                <div className={'flex justify-between'}>
                    <p>{name}</p>
                </div>
                <div className="w-full relative overflow-hidden">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {!find && lastMessage }
                    </p>
                </div>
            </div>
            <div>
                {find && <FaRegPaperPlane/>}
            </div>
        </div>
    );
}
