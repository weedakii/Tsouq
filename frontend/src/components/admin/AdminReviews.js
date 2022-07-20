import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AdminReviews = () => {
  return (
    <div className='grid place-items-center w-screen max-w-full h-[calc(100vh-60px)]'>
        <div className='flex items-center rounded-xl shadow-card p-5 gap-3 text-slate-50 bg-[#d32f2f]'>
            <ErrorOutlineIcon color='inherit' />
            <p>This future will be available soon</p>
        </div>
    </div>
  )
}

export default AdminReviews