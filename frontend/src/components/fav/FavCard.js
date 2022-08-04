import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link, useNavigate} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromFavourite } from '../../actions/favAction';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FROM_FAV_RESET } from '../../constants/favConst';
import { useAlert } from 'react-alert';

const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    isHalf: true,
    size: window.innerWidth < 600 ? 18 : 25,
}

const FavCard = ({card, action}) => {
    

  return (
    <div className='flex overflow-auto'>
        <img 
            src={card?.image}
            alt={card?.name}
            className=' w-28 min-w-[100px]'
        />
        <div className='p-2 min-w-[200px]'>
            <Link className='w-full block font-semibold text-lg underline text-end bg-slate-300' to={`/product/${card.product}`}>{card?.name}</Link>
            <ReactStars {...options} value={card.ratings} />
            <div className='flex justify-between items-center'>
                <p className='font-bold text-xl text-red-700'>{card?.price}$</p>
                <IconButton onClick={() => action(card?.product)} color='error' >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    </div>
  )
}

export default FavCard