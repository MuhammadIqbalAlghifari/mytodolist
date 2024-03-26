"use client"

import WithProtectedPage from "../../../hoc/withProtectedPage";
import AddTopic from "../components/addTopic";

const AddTopicList = ({ addTopicComponent }) => {
    return (
        <>
            {addTopicComponent}
        </>
    )
}

const AddTopicPage = () => {
    return <AddTopicList addTopicComponent={<AddTopic/>}/>
}

export default WithProtectedPage(AddTopicPage)