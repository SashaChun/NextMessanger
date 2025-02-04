"use client";

import Image from "next/image";
import addChat from "../../../../public/Group.png";
import dots from "../../../../public/more-2-line.png";
import skrepka from "../../../../public/gje.png";
import smile from "../../../../public/emotion-happy-line.png";
import lupa from "../../../../public/Vector.png";
 import {useRef, useState} from "react";
import {usePathname} from "next/navigation";
import ContactInfo from "@/components/allChats/ContactInfo";
import ChatItem from "@/components/allChats/ChatItem";
import {signOut} from "next-auth/react";

export default function Chat() {

    const pathName = usePathname();
    const [leftWidth, setLeftWidth] = useState(25);
    const [rightWidth, setRightWidth] = useState(20);
    const isResizingLeft = useRef(false);
    const isResizingRight = useRef(false);
    const [showInfo, setShowInfo] = useState(false);

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

    const handleMouseDown = (side) => {
        if (side === "left") isResizingLeft.current = true;
        if (side === "right") isResizingRight.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // const images = [
    //     users[0].photo , users[1].photo , users[2].photo , users[3].photo , users[4].photo ,
    //     users[0].photo , users[1].photo , users[2].photo , users[3].photo , users[4].photo
    // ];
    //
    // const currentUser = users.filter((user) =>
    //     user.name.replace(/\//g, '').toLowerCase().includes(pathName.replace(/\//g, '').toLowerCase())
    // );

    function show(event){
        if(event === true){
            setShowInfo(true)
        }else if(event === false){
            setShowInfo(false)
        }
    }

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: '/' }); // Перенаправлення на головну сторінку після виходу
    };

    return <div className="flex justify-between h-screen">
        <div className="flex flex-1 flex-col justify-between ">
            <div className={'flex justify-between items-center bg-[#2a2c33]'}>
                <div className={'flex flex-row items-center  space-x-3 px-[20px] py-[10px]'}>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
                    >
                        Log Out
                    </button>
                    {/*<Image src={currentUser[0].photo}*/}
                    {/*       className={'w-[48px] border-2 border-gray-800  h-[48px] rounded-[100%] bg-white flex-shrink-0'}*/}
                    {/*       alt="image"/>                    <p>{currentUser[0].name}</p>*/}
                </div>
                <div>
                    <div
                        className={'flex space-x-3 flex-row  hover:bg-[#25262d] opacity-80 items-center justify-center p-3 rounded-[100%]'}>
                    <Image   src={dots} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]"/>
                    </div>
                </div>
            </div>


            <div className={'px-10  scroll-container  h-full  py-5'}>
                <p className={' text-gray-600-300 text-center mt-4'}>Yesterday</p>
                {/*{*/}
                {/*    users.map((user, userIndex) => (*/}
                {/*        <div key={userIndex}>*/}
                {/*            {currentUser[0].messages.map((event, messageIndex) => (*/}
                {/*             <ChatItem key={messageIndex} message={event.sent} recive={event.received}/>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}

            </div>

            <div className="flex  w-[100%] px-6  flex-row items-center ">
                <div className={'flex py-5 flex-row items-center space-x-3'}>
                    <Image src={skrepka} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]"/>
                    <Image src={smile} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]"/>
                </div>
                <div className="relative flex items-center w-full px-6">
                    <input
                        type="text"
                        className="WeatherData__input pl-4  py-2  w-full  bg-[#26272d] rounded-[5px] outline-none"
                        placeholder="Search"
                    />
                </div>
                <Image src={lupa} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]"/>
            </div>
        </div>
        <div className="w-[2px] bg-[#2b2c2f]  cursor-col-resize" onMouseDown={() => handleMouseDown("right")}></div>
        {showInfo && <ContactInfo currentUser={currentUser} Close={()=>show(false)} rightWidth={rightWidth}/>}
    </div>
}