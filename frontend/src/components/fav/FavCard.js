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
        <Link to={`/product/${card.product}`}><img src={card?.images[0].url} alt={card?.name} className="max-h-52 m-auto rounded" /></Link>
        <div className=" p-2 border-t border-slate-300">
            <Link to={`/product/${card.product}`} className="text sm:text-[16px] text-sm font-tajawal font-semibold mb-2">{card?.name}</Link>
            <div className='flex items-center justify-between'>
                {
                    card?.discount > 0 ? (
                        <p>
                            <span className="mr-2 font-semibold font-tajawal text-[16px] text-green-600">{card.price}EG</span>
                            <span className="line-through text-xs font-bold text-gray-600/70">{card.oldPrice}EG</span>
                        </p>
                    ) : (
                        <span className="font-semibold font-tajawal text-[16px] text-green-600">{card.price}EG</span>
                    )
                }
                {
                    card?.views > 0 ? <p className='text-sm text-slate-500'>({card?.views}views)</p> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default FavCard