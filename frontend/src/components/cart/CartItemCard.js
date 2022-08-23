import React from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart } from '../../actions/cartActions';
import {useDispatch} from 'react-redux'

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
    <div className="flex border-b min-w-fit border-slate-400">
      <div className="h-28 p-2 flex-[0.57] min-w-[320px] flex items-center gap-4 border-r border-slate-400">
        <img className="h-full max-w-[35%] object-contain" src={item.image} alt={item.name} />
        <div className="flex flex-col gap-3 text-start sm:items-center sm:justify-between w-full">
          <Link to={`/product/${item.product}`} className="text w-full font-tajawal" >{item.name}</Link>
          <div className="flex gap-2 w-full items-center justify-between">
            <span dir='rtl' className="w-full text-mainDarkColor text-end font-bold">{`${item.price} جنيه`}</span>
            <p onClick={() => deleteCartItem(item.product)} className="text-red-600 p-2 rounded-full cursor-pointer active:bg-slate-300 hover:bg-slate-200" ><DeleteIcon /></p>
          </div>
        </div>
      </div>
      <div className='flex flex-[0.22] min-w-[120px] items-center justify-center border-r border-slate-400'>
        <button disabled={item.quantity === 1} className={`bg-slate-800 text-slate-100 py-1 px-2 sm:font-medium sm:text-xl ${(item.quantity === 1) ? 'text-slate-500' : ''}`} onClick={() => handleQuantuty(item.product, item.quantity)}>-</button>
        <span className="py-1 px-3 text-sm bg-slate-200">{item.quantity}</span>
        <button disabled={item.quantity === 6} className={`bg-slate-800 text-slate-100 py-1 px-2 sm:font-medium sm:text-xl ${(item.quantity === 6) ? 'text-slate-500' : ''}`} onClick={() => handleIncreaseQuantuty(item.product, item.quantity)}>+</button>
      </div>
      <div dir='rtl' className="flex flex-[0.2] items-center min-w-[120px] justify-center font-tajawal font-semibold text-xl text-green-700">{item.quantity * item.price} جنيه</div>
    </div>
  )
}

export default CartItemCard