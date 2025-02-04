export default function NoPage(){


    const  isNoChat = true

    return <div>
        {!isNoChat && <div className={'h-screen flex items-center justify-center'}>Select Chats</div>}
        {isNoChat && <div className="h-screen flex items-center justify-center">
            <div
                className="w-[50%] h-[50vh] rounded-lg bg-[#18181a] border-[#1c1c1d] border-2 flex flex-col items-center justify-center text-center">
                <p className="text-white text-3xl font-semibold">No chats yet</p>
                <p className="text-white text-lg mt-4">Add a chat to start talking!</p>
                <div className="mt-6">
                    <span className="text-6xl">🦄</span>
                </div>
            </div>
        </div>
        }
    </div>
}