"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { easeOut } from "framer-motion";
import gsap from "gsap";

export default function AddTopic() {

    const router = useRouter()
    const [tittle, setTittle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    let tittleItem, formItem = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!tittle || !description || !date || !status) {
            alert('Tittle, description, date and status are required')
            return;
        }

        try {
            const res = await fetch("https://mytodolist-rouge.vercel.app/api/topics", {
                method: "POST",
                body: JSON.stringify({ tittle, description, date, status })
            });

            if(res.ok) {
                router.push("/todolist");
                router.refresh();
            } else {
                throw Error('Failed To Create A topic');
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        const animatedElement = (element, {opacity, y}) => {
            gsap.fromTo(element, {opacity: 0, y}, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: easeOut
            })
        }

        animatedElement(tittleItem, {opacity: 0})
        animatedElement(formItem, {opacity: 0, y: 100})

    }, [])

    return (
        <main className="px-6 py-6 bg-[#f5f5f5]" style={{fontFamily: 'Futura Md'}}>

            <h1 ref={el => {tittleItem = el}} className="lg:text-4xl md:text-2xl text-xl pt-20 text-center">Add to do list topic</h1>

            <form ref={el => {formItem = el}} onSubmit={handleSubmit} className="flex bg-[#1c1c1c] rounded-lg shadow-lg shadow-black w-full flex-col justify-center items-start gap-4 px-6 py-6 my-10">

                <h1 className="md:text-lg text-md text-white">Title</h1>

                <input 
                onChange={(e) => setTittle(e.target.value)}
                value={tittle}
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="Tittle"/>

                <h1 className="md:text-lg text-md text-white">Description</h1>

                <input 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="Description"/>

                <h1 className="md:text-lg text-md text-white">Start Date</h1>

                <input 
                onChange={(e) => setDate(e.target.value)}
                value={date}
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="dd/mm/yy"/>

                <h1 className="md:text-lg text-md text-white">Deadline</h1>

                <input 
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="dd/mm/yy"/>

                <button className="px-4 py-3 bg-red-600 rounded-md mx-auto w-full my-6 text-white" type="submit">Add</button>

            </form>

        </main>
    )
}