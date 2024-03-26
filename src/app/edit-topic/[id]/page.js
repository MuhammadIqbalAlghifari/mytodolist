import EditTopicForm from "@/app/components/editTopic";

const getTopicsById = async (id) => {
    try {
        const res = await fetch(`https://mytodolist-rouge.vercel.app/api/topics/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Error di halaman edittopicpage.js")
        }
        return res.json()
    } catch (error) {
        console.log(error)
    }
};

export default async function EditTopicPage({ params }) {
    const {id} = params;
    const {topic} = await getTopicsById(id)
    const {tittle, description, startDate, deadline, status} = topic

    return (
        <>
            <EditTopicForm id={id} tittle={tittle} description={description} startDate={startDate} deadline={deadline} status={status}/>
        </>
    ) 
}