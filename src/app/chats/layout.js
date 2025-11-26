import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/sideBar/SideBar";

export const dynamic = 'force-dynamic';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function RootLayout({ children }) {
    const { default: getCurrentUser } = await import("../../../actions/getCurrantUser.js");
    const { default: getUsers } = await import("../../../actions/getUsers.js");
    const { default: getConversations } = await import("../../../actions/getConversations.js");

    const currentUser = await getCurrentUser();
    const users = await getUsers();
    const conversations = await getConversations();

    console.log('conv', conversations);

    return <SideBar users={users} conversations={conversations}>{children}</SideBar>;
}
