import { IoMdPhotos } from "react-icons/io";
import Image from "next/image";
import smile from "../../../../../public/emotion-happy-line.png";
import { FaRegPaperPlane } from "react-icons/fa";
import { useRef } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

export default function Form({lastSegment}) {

    const messageValue = useRef(null);

    function addTestMessage() {
        if (messageValue.current.value.trim()) {
            axios.post('/api/messages', {
                message: messageValue.current.value,
                conversationId: lastSegment
            })
                .then(() => {
                    messageValue.current.value = '';
                })
                .catch((err) => {
                    console.error("Error sending message:", err);
                });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTestMessage();
    };

    const handleUpload = (result) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId: lastSegment
        })
    }

    return (
        <div className="flex w-[100%] px-6 flex-row items-center">
            <div className={'flex py-5 flex-row items-center space-x-3'}>
                <CldUploadButton
                    options={{ maxFiles: 1, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME }}
                    onSuccess={handleUpload}
                    uploadPreset="khil6cee"
                >
                    <IoMdPhotos className="h-[24px] w-[24px]" />
                </CldUploadButton>

                <Image src={smile} width={20} height={20} alt={'dots'} className="h-[24px] w-[24px]" />
            </div>
            <div className="relative flex items-center w-full px-6">
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        ref={messageValue}
                        type="text"
                        className="WeatherData__input pl-4 py-2 w-full bg-[#26272d] rounded-[5px] outline-none"
                        placeholder="Search"
                    />
                </form>
            </div>
            <button type="submit" onClick={handleSubmit} className="ml-2">
                <FaRegPaperPlane className={'text-2xl'} />
            </button>
        </div>
    );
}
