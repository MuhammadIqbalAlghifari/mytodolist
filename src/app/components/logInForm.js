"use client"

import { Button, CircularProgress, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { GetErrorSignIn, SignIn } from "../../../firebase";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { easeOut } from "framer-motion";

export default function LogInForm() {

  const [isLoading, setIsLoading] = useState(false)
  const {register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (values) => {
    event.preventDefault();
    setIsLoading(true)
    const {email, password} = values
    try {
      await SignIn(email, password)
    } catch (error) {
      const message = GetErrorSignIn(error.code)
      console.log(message)
      alert(message)
      setIsLoading(false)
    }
  }


  let formItem = useRef()

  useEffect(() => {

    const animatedElement = (element, {opacity, y}) => {
      gsap.fromTo(element, {opacity: 0, y}, {
        opacity: 1,
        y: 0,
        ease: easeOut,
        duration: 1,
        stagger: 0.2,
      })
    }

    animatedElement(formItem, {opacity: 0, y: 100})

  }, [])

    return (
        <main className="bg-[#f5f5f5] flex flex-col gap-6 justify-center items-center w-full h-screen px-8">

            <form ref={el => {formItem = el}} onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col justify-center items-center gap-4 p-8 max-w-3xl rounded-lg shadow-lg shadow-black">

                <h1 className="lg:text-4xl text-2xl text-center" style={{fontFamily: 'Futura Hv'}}>Sign In Into Your Account</h1>
                <h1 className="md:text-base text-xs text-center max-w-lg mx-auto" style={{fontFamily: 'Futura Md'}}>Welcome Muhammad Iqbal Alghifari!. To verify its you lets sign in to your existing account to see your to-do list!</h1>

                <div className="flex flex-col justify-center w-full items-start gap-2">

                    <label className="lg:text-md md:text-base text-sm">Email</label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    label="Email"
                    focusBorderColor="black"
                    placeholder="Email"
                    {...register("email", {required: true})}
                    />

                    <label className="lg:text-md md:text-base text-sm">Password</label>
                    <Input
                    id="password"
                    name="password"
                    type='password'
                    label="Password"
                    focusBorderColor="black"
                    placeholder="Password"
                    {...register("password", {required: true, minLength: 8})}
                    />

                </div>

                <Button type="submit" disabled={isLoading} bgColor="black" textColor='white' _hover={false} className="w-full">
                    {isLoading && (
                        <CircularProgress isIndeterminate color="black"/>
                    )}
                    Sign In
                </Button>

            </form>

        </main>
    )
}