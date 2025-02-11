import UsersBox from "@/components/allChats/UsersBox.jsx";

export default   function SideBarPeople  ({users}) {



    return <div className="flex justify-center flex-col">
        <p className="text-2xl p-[15px]">Find users </p>
        <div>
            {
                users.map((event , index) => (
                    <UsersBox key={index} find={true} name={event.name} data = {event} />
                ))
            }
        </div>
    </div>
}