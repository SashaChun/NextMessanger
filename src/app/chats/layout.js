import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/sideBar/SideBar";
import {getCurrentUser} from "../../../actions/getCurrantUser";
import {getUsers} from "../../../actions/getUsers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function RootLayout({ children }) {

    const currentUser = await getCurrentUser();
    const users = await getUsers();

    console.log(currentUser)

   return <SideBar users = {users}>{children}</SideBar>

}
