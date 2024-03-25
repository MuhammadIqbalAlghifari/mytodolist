import { Tooltip } from "@chakra-ui/react";
import RemoveButton from "./removeButton";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { easeOut } from "framer-motion";

export default function TopicList({ topics }) {
    const [checkedTopics, setCheckedTopics] = useState({});

    const handleCheckboxChange = (id) => {
        setCheckedTopics(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

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
                        <div key={index} style={{fontFamily: 'Futura Hv', backgroundColor: checkedTopics[t._id] ? "red" : "#1c1c1c"}} className="shadow-black shadow-lg flex flex-col gap-3 rounded-lg w-full px-6 py-6">
                            <div className="flex justify-center items-center">
                                <RemoveButton id={t._id} />
                            </div>
                            <div className="flex flex-col w-full justify-center items-center text-white gap-2">
                                <h3 style={{fontFamily: 'Futura Hv', textDecoration: checkedTopics[t._id] ? "line-through" : "none"}} className="lg:text-lg md:text-md text-base text-center">{t.tittle}</h3>
                                <h3 style={{fontFamily: 'Futura Md', textDecoration: checkedTopics[t._id] ? "line-through" : "none"}} className="lg:text-base md:text-sm text-xs text-center">{t.description}</h3>
                                <h3 style={{fontFamily: 'Futura Hv', textDecoration: checkedTopics[t._id] ? "line-through" : "none"}} className="lg:text-base md:text-sm text-xs text-center">Tanggal mulai : {t.date}</h3>
                                <h3 style={{fontFamily: 'Futura Hv', textDecoration: checkedTopics[t._id] ? "line-through" : "none"}} className="lg:text-base md:text-sm text-xs text-center">Deadline : {t.status}</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <Tooltip label="Mark as finished or not finished">
                                    <input checked={checkedTopics[t._id]} onChange={() => handleCheckboxChange(t._id)} className="w-5 h-5" type="checkbox"/>
                                </Tooltip>
                            </div>
                        </div>
                    ))
                ) : null}
            </article>
        </main>
    );
}
