import React, {useState,useContext, useEffect, useRef } from 'react'
import noteContext from '../context/Notes/NotesContext'
import { Noteitem } from './Noteitems';
import { Addnote } from './Addnote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const context = useContext(noteContext);
  const {notes , getNotes, editNote} = context;
  let history = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      history('/login')
    }
  },[])

  const editnote =(currentNote)=>{
    ref.current.click();
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title, edescription: currentNote.description, etags:currentNote.tags})
  
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote]= useState({id:"",etitle:"", edescription:"", etags:""});

  const handleClick=(e)=>{
    //   e.preventDefault();
    //   updateNote(note.etitle, note.edescription, note.etags);
    editNote(note.id,note.etitle,note.edescription,note.etags)
    ref.current.click();
    props.showAlert("Updated sccessfully","success")
  }

  const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})
  }

    return (
    <>
        <Addnote showAlert={props.showAlert}/>

 <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
  
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input type="text" onChange={onChange} className="form-control" id="etitle" name='etitle' value={note.etitle}/>
    </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <input type="text" onChange={onChange} className="form-control" id="edescription" name="edescription" value={note.edescription} required/>
  </div>
  <div className="mb-3">
    <label className="form-label">Tags</label>
    <input type="text" onChange={onChange} className="form-control" id="etags" name="etags" value={note.etags} required/>
  </div>
</form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

        <div className='row my-3'>
            <h2>Your Notes</h2>
            <div className='container mx-2'>
        {notes.length==0 && 'No notes to display'}
            </div>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={editnote} note={note} />
            })}
        </div>
        </>
    )
}
