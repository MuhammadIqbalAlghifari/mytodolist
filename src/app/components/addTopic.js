"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { easeOut } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";

export default function AddTopic() {

    const router = useRouter()
    const [tittle, setTittle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");
    let tittleItem, formItem, ButtonItem = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!tittle || !description || !startDate || !deadline || !status) {
            alert('Tittle, description, date and status are required')
            return;
        }

        try {
            const res = await fetch("/api/topics", {
                method: "POST",
                body: JSON.stringify({ tittle, description, startDate, deadline, status })
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

        const animatedElement = (element, {opacity, y, x}) => {
            gsap.fromTo(element, {opacity: 0, y, x}, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: easeOut
            })
        }

        animatedElement(tittleItem, {opacity: 0})
        animatedElement(formItem, {opacity: 0, y: 100})
        animatedElement(ButtonItem, {opacity: 0, x: 50})

    }, [])

    return (
        <main className="px-6 py-6 bg-[#f5f5f5]" style={{fontFamily: 'Futura Md'}}>

            <h1 ref={el => {tittleItem = el}} className="lg:text-4xl md:text-2xl text-xl py-4 text-center">Add to do list topic</h1>

            <form ref={el => {formItem = el}} onSubmit={handleSubmit} className="flex bg-[#1c1c1c] rounded-lg shadow-lg shadow-black w-full flex-col justify-center items-start gap-4 px-6 py-6 my-10">

                <h1 className="md:text-lg text-md text-white">Title</h1>

                <input 
                onChange={(e) => setTittle(e.target.value)}
                value={tittle}
                autoComplete="off"
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="Tittle"/>

                <h1 className="md:text-lg text-md text-white">Description</h1>

                <input 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                autoComplete="off"
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="Description"/>

                <h1 className="md:text-lg text-md text-white">Start Date</h1>

                <input 
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                autoComplete="off"
                type="date" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="dd/mm/yy"/>

                <h1 className="md:text-lg text-md text-white">Deadline</h1>

                <input 
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                autoComplete="off"
                type="date" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="dd/mm/yy"/>

                <h1 className="md:text-lg text-md text-white">Status</h1>

                <input 
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                autoComplete="off"
                type="text" 
                className="w-full h-12 bg-white text-black border-none px-6 border rounded-md" 
                placeholder="Selesai / Belum selesai"/>

                <button className="px-4 py-3 bg-red-600 rounded-md mx-auto w-full my-6 text-white" type="submit">Add</button>

            </form>

            <Link ref={el => {ButtonItem = el}} style={{fontFamily: "Futura Md"}} href="/todolist" className="flex justify-start items-center gap-2 text-lg py-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Back
            </Link>

        </main>
    )
}