import Image from "next/image";

export default function Storie({ image }) {
    return <Image src={image} className={'w-[48px] border-2 border-gray-800  h-[48px] rounded-[100%] bg-white flex-shrink-0'}  alt="image"/>
}