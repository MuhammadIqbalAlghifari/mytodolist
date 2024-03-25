// topiclistdata.js

export const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed To Fetch Topics")
        }

        return res.json();

    } catch (error) {
        console.log("Error Loading Topics", error)
    }
}
