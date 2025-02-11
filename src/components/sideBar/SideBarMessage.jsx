import MessageBox from '../allChats/MessageBox.jsx'

export default function SideBarMessage({conversations}) {
    return <div className="flex justify-center flex-col">
        <p className="text-2xl p-[15px]">Messages</p>
        <div>
                {
                    conversations.map((event, index) => (
                        <MessageBox key={index} find={true} name={event.name} data={event}/>
                    ))
                }
            <p className={'flex items-center justify-center h-[50vh]'}>No messages</p>
        </div>
    </div>
}
