import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit,btnText, projectData }) {


  const [categorias, setCategorias] = useState([])
  const [project,setProject]=useState(projectData || {})

useEffect(()=>{
  fetch("http://localhost:5000/categorias", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((resp) => resp.json())
    .then((data) => {
      setCategorias(data)
    })
    .catch(err => console.log(err))
},[])
 

 const submit = (e) =>{
  e.preventDefault()
  handleSubmit(project)
 }

function handleChange(e){
setProject({...project, [e.target.name]: e.target.value })

}

function handleCategoria(e){
  setProject({
    ...project,
    category: {
  id: e.target.value,
  name: e.target.options[e.target.selectedIndex].text, 
  },
  })
  
  }

  return (
    <form onSubmit={submit} className={styles.form}>

      <Input type="text" text="Nome do projeto" name="name" placeholder="insira o nome do projeto" 
      handleOnChange={handleChange}
      value={project.name ? project.name : ''}/>



      <Input type="number" text="Orçamento do projeto" name="budget" placeholder="insira o orçamento total" 
      handleOnChange={handleChange}
      value={project.budget ? project.budget : ''}/>




      <Select name="category_id"
        text="selecione a categoria"
        options={categorias}
        handleOnChange={handleCategoria}
        value={project.category ? project.category.id : ''}
      />

      <Submit text={btnText} />



    </form>
  )
}

export default ProjectForm