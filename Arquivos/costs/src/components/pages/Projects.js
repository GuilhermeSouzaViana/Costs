import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Projects.module.css'
import Container from '../layout/Container'
import Load from '../layout/Load'
import LinkButton from '../layout/LinkButton'
import Message from "../layout/Message"
import ProjectCard from '../project/ProjectCard'


function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoad, setRemoveLoad] = useState(false)
  const [projectMessage,setProjectMessage]=useState('')

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }


  useEffect(() => {


    setTimeout(() => {



      fetch('http://localhost:5000/projects', {

        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }


      })


        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data)
          setRemoveLoad(true)
        })
        .catch((err) => console.log(err))


    }, 2900);
  }, [])


  function removeProject(id) {

    fetch(`http://localhost:5000/projects/${id}`, {

      method: 'DELETE',
      headers: {

        'Content-Type': 'application/json'
      },

    }).then(resp => resp.json())
      .then(data => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage('Projeto Removido')

      })
      .catch(err => console.log(err))

  }




return (
  <div className={styles.project_container}>
    <div className={styles.title_container}>
      <h1>Meus projetos</h1>
      <LinkButton to="newproject" text="Criar Projeto" />
    </div>

    {message && <Message type='success' msg={message} />}
    {projectMessage && <Message type='success' msg={projectMessage} />}

    <Container customClass='start'>
      {projects.length > 0 &&
        projects.map((project) => (
          <ProjectCard
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            key={project.id}
            handleRemove={removeProject}
          />
        ))}

      {!removeLoad && <Load />}
      {!removeLoad && projects.length === 0 && (
        <p>Não há projetos</p>
      )}
    </Container>

  </div>
)
}

export default Projects