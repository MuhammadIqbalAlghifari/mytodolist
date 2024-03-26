import RemoveButton from "./removeButton";
import { useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { easeOut } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopicList({ topics }) {

    const tittleItem = useRef()
    const todolistData = useRef()

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
        animatedElement(todolistData.current.children, {opacity: 0, y: 100})

    }, [])

    return (
        <main className="bg-[#f5f5f5] flex flex-col md:px-6 px-10 justify-center w-full py-24 items-center gap-4">
            <h1 ref={tittleItem} className="lg:text-4xl md:text-2xl text-xl py-4" style={{fontFamily: 'Futura Md'}}>My To Do List</h1>
            <article ref={todolistData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-x-5 gap-y-5 mx-auto">
                {topics && topics.length > 0 ? (
                    topics.map((t, index) => (
                        <div key={index} style={{fontFamily: 'Futura Hv'}} className="bg-[#1c1c1c] shadow-black shadow-lg flex flex-col gap-3 rounded-lg w-full px-6 py-6">
                            <div className="flex justify-center items-center">
                                <RemoveButton id={t._id} />
                            </div>
                            <div className="flex flex-col w-full justify-center items-center text-white gap-2">
                                <h3 style={{fontFamily: 'Futura Hv'}} className="lg:text-lg md:text-md text-base text-center">{t.tittle}</h3>
                                <h3 style={{fontFamily: 'Futura Md'}} className="lg:text-base md:text-sm text-xs text-center">{t.description}</h3>
                                <h3 style={{fontFamily: 'Futura Hv'}} className="lg:text-base md:text-sm text-xs text-center">Tanggal mulai : {t.startDate}</h3>
                                <h3 style={{fontFamily: 'Futura Hv'}} className="lg:text-base md:text-sm text-xs text-center">Deadline : {t.deadline}</h3>
                                <h3 style={{fontFamily: 'Futura Hv', }} className="lg:text-base md:text-sm text-xs text-center">Status : {t.status}</h3>
                                <Link href={`/edit-topic/${t._id}`}>
                                    <button type="submit" style={{fontFamily: 'Futura Md', }} className="text-sm bg-red-500 px-4 py-2 rounded-lg flex justify-center items-center gap-2 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : null}
            </article>
        </main>
    );
}
