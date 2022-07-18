import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart } from '../../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux'

const CartItemCard = ({item, deleteCartItem}) => {
  const dispatch = useDispatch()
  const handleQuantuty = (id,quantity) => {
    const newQty = quantity - 1;
      if (quantity <= 1) {
        return;
      }
    dispatch(addToCart(id, newQty))
  }
  const handleIncreaseQuantuty = (id, quantity) => {
    const newQty = quantity + 1;
    if (quantity >= 6) {
      return;
    }
    dispatch(addToCart(id, newQty))
  }
  return (
    <div className="grid grid-cols-cart border-b border-slate-400">
      <div className="h-28 p-3 flex items-center gap-4 border-r border-slate-400">
        <img className="h-full" src={item.image} alt={item.name} />
        <div className="flex sm:flex-row flex-col gap-4 text-start sm:items-center sm:justify-between w-full">
          <Link to={`/product/${item.product}`} className="w-full" style={{textDecoration: 'underline'}} >{item.name}</Link>
          <div className="flex gap-2 w-full items-center">
            <span className="w-full font-bold">{`${item.price}$`}</span>
            <p onClick={() => deleteCartItem(item.product)} className="text-red-600 p-2 rounded-full cursor-pointer active:bg-slate-300 hover:bg-slate-200"><DeleteIcon /></p>
          </div>
        </div>
      </div>
      <div className='flex p-1 items-center justify-center border-r border-slate-400'>
        <button disabled={item.quantity === 1} className={`bg-slate-800 text-slate-100 py-1 px-2 sm:font-medium sm:text-xl ${(item.quantity === 1) ? 'text-slate-500' : ''}`} onClick={() => handleQuantuty(item.product, item.quantity)}>-</button>
        <span className="py-1 px-3 text-sm bg-slate-200">{item.quantity}</span>
        <button disabled={item.quantity === 6} className={`bg-slate-800 text-slate-100 py-1 px-2 sm:font-medium sm:text-xl ${(item.quantity === 6) ? 'text-slate-500' : ''}`} onClick={() => handleIncreaseQuantuty(item.product, item.quantity)}>+</button>
      </div>
      <div className="flex items-center justify-center font-serif font-semibold text-xl text-green-700">${item.quantity * item.price}</div>
    </div>
  )
}

export default CartItemCard