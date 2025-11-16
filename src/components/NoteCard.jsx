import React from 'react'
import { format } from 'date-fns'

export default function NoteCard({note, onEdit, onDelete}){
  // detect duplicate title badge: if title ends with (n) show badge
  const isDup = /\(\d+\)$/.test(note.title)

  return (
    <article className="bg-white p-4 rounded shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{note.title}</h3>
        <div className="text-sm text-gray-500">{note.category}</div>
      </div>
      {isDup && <div className="inline-block mt-2 text-xs text-white bg-red-500 px-2 py-0.5 rounded">Duplicate Title</div>}
      <p className="mt-3 text-sm text-gray-700">{note.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>{format(new Date(note.createdAt), 'PP p')}</span>
        <div className="space-x-2">
          <button onClick={onEdit} className="text-indigo-600 hover:underline">Edit</button>
          <button onClick={onDelete} className="text-red-600 hover:underline">Delete</button>
        </div>
      </div>
    </article>
  )
}
