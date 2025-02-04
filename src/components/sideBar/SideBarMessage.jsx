export default function SideBarMessage() {
    return <div className="flex justify-center flex-col">
        <p className="text-2xl p-[15px]">Messages</p>
        <div>
            {/*{(filterUsers.length > 0 ? filterUsers : users).map((user, index) => (*/}
            {/*    <Message*/}
            {/*        key={index}*/}
            {/*        photo={user.photo}*/}
            {/*        name={user.name}*/}
            {/*        lastMessage={user.messages[user.messages.length - 1]?.received || ''}*/}
            {/*    />*/}
            {/*))}*/}
            <p className={'flex items-center justify-center h-[50vh]'}>No messages</p>
        </div>
    </div>
}