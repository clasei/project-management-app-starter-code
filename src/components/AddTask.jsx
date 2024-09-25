
import { useState } from "react";
import axios from "axios";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // ...logic for creating a new Task should be here
    // ... the ID of the Project should be part of the Task data

    const newTask = {
      title, 
      description,
      projectId: props.projectId // projectId(props.projectId)
    }

    console.log(newTask)

    axios.post(`https://project-management-api-4641927fee65.herokuapp.com/tasks`, newTask)
    .then(() => {
      // do sth with the user
      console.log('task created')
      props.getData() // this updates the state of the project and refresh the page !!!
      // getData() makes another call and updates all the info
    })
    .catch((error) => {
      console.log(error)
    })
  };
  
  return (
    <div className="AddTask">
      <h3>Add New Task</h3>
      
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

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;