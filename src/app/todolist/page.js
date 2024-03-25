"use client"

import { useEffect, useState } from "react";
import WithProtectedPage from "../../../hoc/withProtectedPage";
import Navbar from "../components/navbar";
import TopicList from "../components/topiclist";
import { getTopics } from "../components/topiclistdata";

const ToDoList = ({ navbarComponent, topicListComponent }) => {
  return (
    <>
      {navbarComponent}
      {topicListComponent}
    </>
  )
}

const ToDoListPage = () => {
  // State to store topics
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    // Function to fetch topics
    const fetchTopics = async () => {
      try {
        const { topics } = await getTopics();
        setTopics(topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    // Call the fetchTopics function
    fetchTopics();
  }, []);

  return (
    <ToDoList 
      navbarComponent={<Navbar />} 
      // Pass fetched topics as prop to TopicList component
      topicListComponent={<TopicList topics={topics} />} 
    />
  );
}

export default WithProtectedPage(ToDoListPage);
