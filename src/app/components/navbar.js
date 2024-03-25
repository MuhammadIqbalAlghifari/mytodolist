"use client"

import { Tooltip } from "@chakra-ui/react"
import Link from "next/link"
import { SignOut } from "../../../firebase"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { easeOut } from "framer-motion"

export default function Navbar() {

    let backgroundNav, logoItem, addPostButton, signOutButton = useRef()

    useEffect(() => {

        const animatedElement = (element, {opacity, y}) => {
            gsap.fromTo(element, {opacity: 0, y}, {
                opacity: 1,
                duration: 1,
                y: 0,
                ease: easeOut,
                stagger: 0.2
            })
        }

        animatedElement(backgroundNav, {opacity: 0, y: -100})
        animatedElement([logoItem, addPostButton, signOutButton], {opacity: 0})

    }, [])

    return (
        <nav ref={el => {backgroundNav = el}} className="fixed z-50 bg-[#1c1c1c] w-full flex justify-between items-center px-4 py-4">

            <a ref={el => {logoItem = el}} href="https://miaportfolio.vercel.app" target="_blank" rel="noopener noreferrer">

                <h1 className="text-white lg:text-4xl md:text-2xl text-xl" style={{fontFamily: "Futura Hv"}}>MIA</h1>

            </a>

            <ul className="flex justify-center items-center gap-4">
                <li ref={el => {addPostButton = el}}>

                    <Link href='/add-topic'>

                        <Tooltip label="Add new list">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </Tooltip>
                    
                    </Link>

                </li>

                <li ref={el => {signOutButton = el}}>

                    <Tooltip label="Sign Out">
                        <button onClick={SignOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>
                        </button>
                    </Tooltip>

                </li>

                <li>

                </li>
            </ul>

        </nav>
    )
}