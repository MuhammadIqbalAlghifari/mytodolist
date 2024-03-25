"use client"

import { useUser } from "../context/user"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const WithUnprotectedPage = (Component) => {
    return (props) => {
        const router = useRouter()
        const user = useUser()
        const { uid } = user
    
    useEffect(() => {
        if(uid) {
            router.replace("/todolist")
        } 
    }, [uid, router]);

        return <Component {...props}/>

    }
}

export default WithUnprotectedPage