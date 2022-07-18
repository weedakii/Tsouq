import React from 'react'

const Loader = () => {
  return (
    <div className="grid place-items-center w-screen h-[calc(100vh-60px)] max-h-full">
        <div className="w-20 h-20 border-b-[5px] border-t-[5px] animate-spin rounded-full border-slate-700"></div>
    </div>
  )
}

export default Loader