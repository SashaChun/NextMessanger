'use client';
import './globals.css';
import ToasterContext from "@/app/context/ToasterContext";
import AuthContext from "@/app/context/AuthContext";

export default function authLayout({ children }) {
    return (
        <html>
        <body>
        <div className="flex flex-col flex-1">
            <main className="flex-1 overflow-auto bg-background">
                <AuthContext>
                <ToasterContext/>
                    {children}
                </AuthContext>
            </main>
        </div>
        </body>
        </html>
    );
}
