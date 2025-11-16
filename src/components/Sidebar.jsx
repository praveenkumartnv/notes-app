import React from 'react'

export default function Sidebar({categories, filter, setFilter, openModal}){
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Notes</h2>
      </div>
      <div className="p-4">
        <ul>
          {categories.map(cat => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-2 rounded ${filter===cat ? 'bg-indigo-50 font-semibold' : 'hover:bg-gray-50'}`}
                onClick={()=>setFilter(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button onClick={openModal} className="w-full px-3 py-2 bg-indigo-600 text-white rounded">+ New</button>
        </div>
      </div>
    </aside>
  )
}
