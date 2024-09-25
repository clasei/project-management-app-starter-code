import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import axios from "axios";

function ProjectDetailsPage () {

  // we have to call the API in every component
  // INFO IS DYNAMIC NOT STATIC, SO WE CALLED THE API AGAIN
  // steps: 
  // useState, useEffect, axios , promise, loading
  // + useParams // to extract


  const params = useParams()
  console.log(params)


  // const { projectId } = useParams()
  

  const [ project, setProject ] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => { // REMEMBER: invoke function in useEffect

    try {

      const response = await axios.get(`https://project-management-api-4641927fee65.herokuapp.com/projects/${params.projectId}?_embed=tasks`)
      // check docs to make sure you customize the url ok
      console.log(response)

      setProject(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  if(project === null) {
    return <h3>...loading</h3>
  }
  
  return (
    <div className="ProjectDetailsPage">

      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      {/* ... list of all Tasks for this Project should be rendered here */}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}

      {project.tasks.map((eachTask) => {
        return ( <TaskCard key={eachTask.id} {...eachTask} /> )
      })}

      {/* ... form for adding a new Task should be rendered here    */}
      {/* id can be sent as props or params   */}
      <AddTask projectId={project.id} getData={getData} /> 
      
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
      
      <Link to={`/projects/edit/${project.id}`}>
        <button>Edit Project</button>
      </Link>      
      
    </div>
  );
}

export default ProjectDetailsPage;
