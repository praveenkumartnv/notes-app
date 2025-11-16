import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Sidebar from './components/Sidebar'
import NoteCard from './components/NoteCard'
import NoteModal from './components/NoteModal'
import notesJson from './notes.json'

const STORAGE_KEY = 'notesApp.v1'

export default function App(){
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('All Notes')
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(()=>{
    const saved = localStorage.getItem(STORAGE_KEY)
    if(saved){
      try {
        setNotes(JSON.parse(saved))
        return
      } catch(e){}
    }
    // load from static JSON
    setNotes(notesJson)
  },[])

  useEffect(()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const categories = ['All Notes', ...Array.from(new Set(notes.map(n => n.category)))]

  function createNote(note){
    // conflict handling: duplicate titles within same category
    let dupCount = notes.filter(n => n.category===note.category && n.title===note.title).length
    if(dupCount>0){
      note.title = `${note.title} (${dupCount+1})`
    }
    note.id = Date.now()
    note.createdAt = new Date().toISOString()
    setNotes(prev => [note, ...prev])
    setModalOpen(false)
  }

  function updateNote(updated){
    setNotes(prev => prev.map(n => n.id===updated.id ? {...updated} : n))
    setEditing(null)
  }

  function deleteNote(id){
    if(!confirm('Delete this note?')) return
    setNotes(prev => prev.filter(n => n.id!==id))
    setEditing(null)
  }

  const visible = notes.filter(n => filter==='All Notes' ? true : n.category===filter)

  return (
    <div className="min-h-screen flex">
      <Sidebar categories={categories} filter={filter} setFilter={setFilter} openModal={()=>{setModalOpen(true)}} />
      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Notes ({visible.length})</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={()=>setModalOpen(true)}>New Note</button>
        </div>

        {visible.length===0 ? (
          <div className="text-center text-gray-500 mt-12">No notes found in this category.</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(note => (
              <NoteCard key={note.id} note={note} onEdit={()=>{ setEditing(note); setModalOpen(true) }} onDelete={()=>deleteNote(note.id)} />
            ))}
          </div>
        )}

      </main>

      {modalOpen && (
        <NoteModal
          onClose={()=>{ setModalOpen(false); setEditing(null)}}
          onSave={editing ? updateNote : createNote}
          initial={editing}
        />
      )}
    </div>
  )
}
