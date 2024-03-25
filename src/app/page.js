"use client"

import WithUnprotectedPage from "../../hoc/withUnprotectedPage";
import LogInForm from "./components/logInForm";

const Home = () => {
  return (
    <>
      <LogInForm/>
    </>
  )
}

export default WithUnprotectedPage(Home)
