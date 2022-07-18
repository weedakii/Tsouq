import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import CartItemCard from './CartItemCard'
import { removeFromCart } from '../../actions/cartActions'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {cartItems} = useSelector(state => state.cart)

    const removeFields = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/signin?redirect=shipping")
    }

  return (
    <div className="p-5">
        {
            (cartItems.length === 0) ? 
            <div className="text-center py-3">
                <p className="p-3 bg-slate-200 text-orange-800 text-lg mb-4 w-fit mx-auto rounded-lg">there are no items yet</p>
                <Link to='/' className="text-slate-800 font-semibold underline text-lg">Go Home And Add Some</Link>
            </div> 
            : <>
            <div className="rounded-lg border shadow-card border-slate-300 overflow-x-hidden">
                <div className="bg-orange-600 grid grid-cols-cart text-center  border-b border-slate-400">
                    <h3 className='p-3 text-slate-100 border-r border-slate-300 text-start'>Product</h3>
                    <h3 className='p-3 text-slate-100 border-r border-slate-300'>Quantity</h3>
                    <h3 className='p-3 text-slate-100 text-right'>Subtotal</h3>
                </div>
                <div>
                    {
                        cartItems && cartItems.map(c => (
                            <CartItemCard key={c.product} item={c} deleteCartItem={removeFields} />
                        ))
                    }
                </div>
            </div>
            <div className="w-full sm:w-3/5 md:w-2/5 lg:w-2/6 ml-auto mt-6 p-2 shadow-card rounded-lg font-mono">
                <h2 className="p-2 bg-slate-200 rounded-lg text-lg pl-4 font-semibold">Home Delivery</h2>
                <div className="p-2 my-5 border-y border-slate-300">
                    <p className="flex justify-between text-sm font-semibold mb-2"><span>Suptotal:</span> <span className="text-slate-500">{`$${cartItems.reduce(
                    (acc, item) => acc + item.quantity*item.price,
                    0
                )}`}</span></p>
                    <p className="flex justify-between text-sm font-semibold"><span>Delivery:</span> <span className="text-slate-500">0.00$</span></p>
                </div>
                <p className="flex justify-between text-xl pb-3 font-semibold border-b border-slate-300"><span>Total:</span> <span className="text-red-600">{`$${cartItems.reduce(
                    (acc, item) => acc + item.quantity*item.price,
                    0
                )}`}</span></p>
                <button 
                    onClick={checkoutHandler}
                    className="block my-3 mx-auto p-2 text-center rounded-full font-semibold text-lg bg-amber-700 text-slate-50 w-[90%]">
                    Checkout
                </button>
            </div>
            </>
        }
    </div>
  )
}

export default Cart