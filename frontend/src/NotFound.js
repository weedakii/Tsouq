import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <div className="grid place-items-center h-[70vh]">
            <div className="text-center">
                <h2 className="text-center text-2xl mb-5 text-slate-100 font-serif font-bold py-3 px-10 bg-slate-800">Page not found</h2>
                <Link to='/' className="text-2xl underline">Back Home</Link>
            </div>
        </div>
    </>
  )
}

export default NotFound