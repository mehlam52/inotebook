import React, { useState } from "react";
import noteContext from "./NotesContext";

const NoteState =(props)=>{
  const host = 'http://localhost:5000'
    const notesInitial= []

    const[notes,setNotes]= useState(notesInitial)

    //get all NOTEs
    const getNotes = async()=>{
       //API call
       console.log(localStorage.getItem('token'))
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
    });
    const json = await response.json()
   console.log(json)
   setNotes(json)
    }


    //ADD NOTE
    const addNote = async(title, description, tags)=>{
      console.log("adding")
       //API call
       const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },

        body: JSON.stringify({title, description, tags}) 
    });
  

      const note= await response.json();
      setNotes(notes.concat(note))
      // getNotes();
    }
    
    //DELETE NOTE
    const deleteNote = async (id)=>{
      //API call
      console.log('deleting id:'+id)
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
    });
    getNotes()
  }


    //EDIT NOTE
    const editNote = async (id,title,description,tags)=>{
      //API call
      console.log('updating....')
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },

        body: JSON.stringify({title,description,tags}) 
    });
  
 const json = response.json();
 console.log(json);
 let newnotes = JSON.parse(JSON.stringify(notes))
      //logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = newnotes[index];
        if(element._id === id){
          newnotes[index].title = title;
          newnotes[index].description = description;
          newnotes[index].tags = tags;
          break;
        }
      }
      setNotes(newnotes);
    }


return(
    <noteContext.Provider value={{notes,addNote, deleteNote, editNote,getNotes}}>
        {props.children}
    </noteContext.Provider>
)
}
export default NoteState;