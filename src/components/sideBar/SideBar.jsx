'use client'

import {useRef, useState} from "react";
import Image from "next/image";
import addChat from "../../../public/Group.png";
import dots from "../../../public/more-2-line.png";
import lupa from "../../../public/Vector.png";
import noImagePick from '../../components/sideBar/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg'
import SideBarMessage from "@/components/sideBar/SideBarMessage";
import SideBarPeople from "@/components/sideBar/SideBarPeople";

export default  function SideBar ({users  , conversations,children}){
    const [leftWidth, setLeftWidth] = useState(25);
    const [rightWidth, setRightWidth] = useState(20);
    const isResizingLeft = useRef(false);
    const isResizingRight = useRef(false);
    const inputRef = useRef(null);
    const [filterUsers  , setFilterUsers] = useState([]);

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

    return (
        <div className="flex justify-between h-screen">
            <div
                className="bg-foreground  overflow-y-auto scroll-container min-h-screen border-2 border-[#2b2c2f]"
                style={{ width: `${leftWidth}vw` }}
            >
                <div className="flex p-[15px] justify-center flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <Image
                            src={'' || noImagePick}
                            className="w-[48px] border-2 border-gray-800 h-[48px] rounded-full bg-white flex-shrink-0"
                            alt="image"
                        />
                        <div className="flex space-x-3 flex-row">
                            <Image src={addChat}   width={24} height={24} alt="addChat" className="h-[24px] w-[24px]" />
                            <Image src={dots} width={20} height={20} alt="dots" className="h-[24px] w-[24px]" />
                        </div>
                    </div>
                    <div className="relative w-full mt-[15px]">
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                className="WeatherData__input pl-4 pr-12 py-2 w-full bg-[#26272d] rounded-[5px] outline-none"
                                placeholder="Search"
                                ref={inputRef}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Image   src={lupa} alt="search icon" width={20} height={20} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[#2b2c2f]"></div>
                {/*{<div className="flex p-[15px] justify-center flex-col">*/}
                {/*    <p className="text-2xl">Stories</p>*/}
                {/*    <div className="flex overflow-x-hidden mt-[15px] space-x-3">*/}
                {/*        /!*{images.map((item, index) => (*!/*/}
                {/*        /!*    <Storie key={index} image={item} />*!/*/}
                {/*        /!*))}*!/*/}
                {/*    </div>*/}
                {/*</div>}*/}
                <div className="h-[1px] w-full bg-[#2b2c2f]"></div>
                   <SideBarMessage conversations={conversations} /> <SideBarPeople users={users}/>
            </div>
            <div className="w-[2px] bg-[#2b2c2f] cursor-col-resize" onMouseDown={() => handleMouseDown("left")}/>
            <div className="flex flex-1 flex-col justify-between">{children}</div>
            <div className="w-[2px] bg-[#2b2c2f] cursor-col-resize" onMouseDown={() => handleMouseDown("right")} />
        </div>

    );
}