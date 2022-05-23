import React, { useState, useContext } from 'react'
import noteContext from '../context/Notes/NotesContext'
import { useForm } from "react-hook-form";


export const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote]= useState({title:"", description:"", tags:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setNote({title:"", description:"", tags:""})
        props.showAlert("Added successfully","success")
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

  return (
    <div className='container'>
    <h2>Add a note</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input type="text" onChange={onChange} className="form-control" id="title" name='title' value={note.title} /> 
    {/* <br />
        {errors.requiredField && <span>This field is required</span>}
        <br /> */}
    </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <input required type="text" onChange={onChange} className="form-control" id="description" name="description" value={note.description}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Tags</label>
    <input type="text" onChange={onChange} className="form-control" id="tags" name="tags" value={note.tags}/>
  </div>
  <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
