import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'


function EditProjectPage() {

  // 2 calls to API ===>
  // 1st == GET to bring info
  // 2nd == PUT to send the new info
  // this guarantees dynamic changes are updated

  // const params = useParams()
  // this can be done with { projectId } directly, but params access al the info
  const params = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // state created to indicate that fetching is happening
  const [isFetching, setIsFetching] = useState(true)


  // updates info when we acces the first time
  useEffect(() => {

    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
    .then((response) => {
      console.log(response)

      setTitle(response.data.title)
      setDescription(response.data.description)
      // used to manage fetching state
      setIsFetching(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  // then/catch never is an async function
  // aysnc/await always async function
    // if we are making a call to an external API the function has to be asynchronous

  const handleFormSubmit = async (e) => { 
    e.preventDefault();
    // ...updated logic should be here
    // get, post, navigate?

    const updatedProject = {
      title,
      description
    }

    try { // evth asynchronous hast be inside the try

      await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`, updatedProject)
      
      // front-end redirection
      navigate(`/projects/${params.projectId}`)


    } catch (error) {
      console.log(error)
      
    }

  };

  const deleteProject = () => {
    // ...delete logic should be here

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)

    .then(() => {

      navigate('/projects')

    })
    .catch((error) => {
      console.log(error)
    })
    
  }; 

  if (isFetching) {
    return <h3>...loading data</h3>
  }

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
  
    </div>
  );
}

export default EditProjectPage;
