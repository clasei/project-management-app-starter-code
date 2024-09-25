import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"; // used to render each Project
import { useState, useEffect } from "react";
import axios from "axios";
// axios has been pre-isntalled with initial code --> npm i axios
// it allows as to be anchored to the API

// API can be declared globally
// let projManagAPI = "https://project-management-api-4641927fee65.herokuapp.com/projects"

function ProjectListPage() {
  // ProjectListPage will make an external call to an API
  // steps: 
  // useState, useEffect, fetch / async-await, resolving promise, loading

  const [ allProjects, setAllProjects ] = useState(null)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`)
    // axios.get(projManagAPI) // fetch replaced with axios
    // all data will be stored in a variable called data

    // .then((response) => {
      .then(({data}) => {
      console.log(data)
      // setAllProjects(response.data) // always use .data when working with axios
      setAllProjects(data) // data destructured
    })

    .catch((err) => {
      console.log(err)
    })

  }, [])
  
  return (
    <div className="ProjectListPage">

      <Link to="/projects/create">
        <button>Create Project</button>
      </Link>     

      {/* ... list of all projects should be rendered here   */}
      {/* ... for each project, we should render one ProjectCard */}

      {allProjects === null ? (<h3>...loading</h3>) : (
        allProjects.map((eachProject) => {

          return (
            // <p key={eachProject.id}>{eachProject.title}</p>
            <ProjectCard key={eachProject.id} {...eachProject}/>

          )
        })
      )}
       
    </div>
  );
}

export default ProjectListPage;