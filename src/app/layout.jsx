'use client';
import '../globals.css';

export default function authLayout({ children }) {
    return (
         <div className="flex flex-col flex-1">
            <main className="flex-1 overflow-auto p-4 bg-background">
                {children}
            </main>
        </div>
    );
}
