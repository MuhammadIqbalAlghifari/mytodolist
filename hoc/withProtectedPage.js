"use client"

import { useUser } from "../context/user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const WithProtectedPage = (Component) => {
    return (props) => {
        const router = useRouter()
        const user = useUser()
        const { uid } = user
    
    useEffect(() => {
        if(!uid) {
            router.replace("/")
        } 
    }, [uid, router]);

        return <Component {...props}/>

    }
}

export default WithProtectedPage