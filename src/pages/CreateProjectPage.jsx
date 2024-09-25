import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // ...logic for creating a new Project should be here

    // recopilate new project data
    const newProject = { // info comes from documentation !!!
      title,
      description // this is the same that description: description
    }


    try {

        // call API to create new project // ==> async funciton
        // post used according to docs to create a new project !!!
        // back-end route
        // POST, so we can omit the variable
        // const response = await axios.post(`https://project-management-api-4641927fee65.herokuapp.com/projects`, newProject)
        await axios.post(`https://project-management-api-4641927fee65.herokuapp.com/projects`, newProject)

        // navigate to projects
        // front-end route
        navigate("/projects") 

      
    } catch (error) {
      
    }

  };  

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}> 
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateProjectPage;