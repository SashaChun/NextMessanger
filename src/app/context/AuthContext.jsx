'use client'

import {SessionProvider} from "next-auth/react";

export default function AuthContext({children}){
    return <div>
        <SessionProvider>
            {children}
        </SessionProvider>
    </div>
}