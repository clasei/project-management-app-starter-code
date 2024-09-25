import { Link } from "react-router-dom";

function ProjectCard (props) {
  // console.log(props)
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${props.id}`}>
        <h3>{props.title}</h3>
      </Link>
      <p>{props.description}</p>
    </div>
  );
}

export default ProjectCard;