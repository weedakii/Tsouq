import React from 'react'

const CatCard = ({name, image}) => {
  return (
    <div style={{backgroundImage: `url(${image})`}} className="w-[120px] h-[100px] rounded-xl overflow-hidden bg-no-repeat bg-cover ">
      <div dir='rtl' className='relative bg-slate-800/50 w-full h-full flex items-end text-start'>
        <p className='text-slate-50 absolute font-semibold text-xl pr-4 pl-6 pt-4 pb-2'>
          {
            name
          }
        </p>
      </div>
    </div>
  )
}

export default CatCard