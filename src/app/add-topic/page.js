"use client"

import WithProtectedPage from "../../../hoc/withProtectedPage";
import AddTopic from "../components/addTopic";
import Navbar from "../components/navbar";

const AddTopicList = ({ navbarComponent, addTopicComponent }) => {
    return (
        <>
            {navbarComponent}
            {addTopicComponent}
        </>
    )
}

const AddTopicPage = () => {
    return <AddTopicList navbarComponent={<Navbar/>} addTopicComponent={<AddTopic/>}/>
}

export default WithProtectedPage(AddTopicPage)