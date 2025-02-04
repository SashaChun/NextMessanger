export default function ChatItem({Mymessage ,recive }){
    if(recive){
        return <div className={'w-[100%] flex justify-end'}>
            <div className="relative bg-[#bdd2b6]  text-[#26272d] rounded-xl max-w-[80%] p-3
         before:content-[''] before:absolute before:top-[10px] before:-right-[10px] before:w-0 before:h-0
        before:border-t-[8px] before:border-t-transparent
        before:border-b-[8px] before:border-b-transparent
        before:border-l-[10px] before:border-[#bdd2b6]">
                {Mymessage}
            </div>
        </div>
    }else {
       return <div className={'w-[100%] flex justify-start'}>
            <div
                className="relative bg-[#26272d]  rounded-xl max-w-[80%] p-3 before:content-[''] before:absolute before:top-[10px] before:-left-[10px] before:w-0 before:h-0 before:border-t-[8px] before:border-t-transparent before:border-b-[8px] before:border-b-transparent before:border-r-[10px] before:border-[#26272d]">
                {recive}
            </div>
        </div>
    }
}