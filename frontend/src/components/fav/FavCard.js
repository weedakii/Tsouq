import { IconButton } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';



const FavCard = ({card, action}) => {
    

  return (
    <div  className="relative flex flex-col justify-between min-h-[260px] max-w-[250px] min-w-[160px] border rounded bg-white border-slate-200 hover:-translate-y-3 hover:shadow-card duration-300 ease-out transition">
        <div className="absolute cursor-pointer text-red-600 bg-slate-50 p-1 rounded-md shadow-sh sm:top-4 sm:right-4 top-2 right-2">
          <IconButton size='small' onClick={() => action(card?.product)} color='error' >
              <DeleteIcon className='text-xs active:scale-50 transition-all duration-150' />
          </IconButton>
        </div>
        <img src={card?.image} alt={card?.name} className="max-h-52 m-auto rounded" />
        <div className=" p-2 border-t border-slate-300">
            <Link to={`/product/${card.product}`} className="text underline sm:text-lg text-base font-serif font-bold">{card?.name}</Link>
            <span className="font-bold text-xl text-orange-700">{card?.price}$</span>
        </div>
    </div>
  )
}

export default FavCard