import React, { useEffect, useState } from 'react'

export default function NoteModal({onClose, onSave, initial}){
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [category, setCategory] = useState(initial?.category || 'Personal')

  useEffect(()=> {
    function onKey(e){ if(e.key==='Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])

  function submit(e){
    e.preventDefault()
    const payload = {
      id: initial?.id,
      title: title.trim() || 'Untitled',
      description,
      category
    }
    onSave(payload)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
      <form className="bg-white rounded p-6 z-10 w-full max-w-lg" onSubmit={submit}>
        <h3 className="text-lg font-semibold mb-3">{initial ? 'Edit Note' : 'New Note'}</h3>
        <div className="space-y-3">
          <input className="w-full border px-3 py-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea className="w-full border px-3 py-2 rounded" rows="6" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
          <input className="w-full border px-3 py-2 rounded" placeholder="Category (e.g. Work)" value={category} onChange={e=>setCategory(e.target.value)} />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-3 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">{initial ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  )
}
