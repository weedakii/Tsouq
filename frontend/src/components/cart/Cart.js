import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CartItemCard from './CartItemCard'
import { removeFromCart } from '../../actions/cartActions'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

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

    const card = cartItems && cartItems.map(c => (
        <CartItemCard key={c.product} item={c} deleteCartItem={removeFields} />
    ))

  return (
    <div className="p-5 h-full">
        <MetaData title={`حقيبتك - تسوق`} />
        {
            (cartItems.length === 0) ? 
            <div className="text-center py-3">
                <p className="p-3 bg-slate-200 text-orange-800 text-lg mb-4 w-fit mx-auto rounded-lg">there are no items yet</p>
                <Link to='/' className="text-slate-800 font-semibold underline text-lg">Go Home And Add Some</Link>
            </div> 
            : <>
            <div className="rounded-lg border flex flex-col shadow-card border-slate-300 overflow-x-auto">
                <div className="bg-mainDarkColor min-w-fit flex text-start  border-b border-slate-400">
                    <h3 className='p-3 text-slate-100 border-r flex-[0.6] min-w-[320px] border-slate-300 text-start'>Product</h3>
                    <h3 className='p-3 text-slate-100 border-r flex-[0.2] min-w-[120px] border-slate-300'>Quantity</h3>
                    <h3 className='p-3 text-slate-100 flex-[0.2] min-w-[120px] text-right'>Subtotal</h3>
                </div>
                <div>
                    {
                        card
                    }
                </div>
            </div>
            <div dir='rtl' className="w-full sm:w-3/5 md:w-2/5 lg:w-2/6 ml-auto mt-6 p-2 shadow-card rounded-lg font-tajawal">
                <h2 className="p-2 bg-slate-200 rounded-lg text-lg pl-4 font-semibold">توصيل الي المنزل</h2>
                <div className="p-2 my-5 border-y border-slate-300">
                    <p className="flex justify-between text-sm font-semibold mb-2"><span>التكلفة:</span> <span className="text-slate-500">{`${cartItems.reduce(
                    (acc, item) => acc + item.quantity*item.price,
                    0
                )} جنيه`}</span></p>
                    <p className="flex justify-between text-sm font-semibold"><span>الشحن:</span> <span className="text-slate-500">20 جنيه</span></p>
                </div>
                <p className="flex justify-between text-xl pb-3 font-semibold border-b border-slate-300"><span>الاجمالي:</span> <span className="text-red-700 text-2xl font-bold">{`${cartItems.reduce(
                    (acc, item) => acc + item.quantity*item.price ,
                    0
                )+ 20} جنيه`}</span></p>
                <button 
                    onClick={checkoutHandler}
                    className="block my-3 mx-auto p-2 text-center rounded-full font-semibold text-lg bg-emerald-900 text-slate-50 w-[90%]">
                    التالي
                </button>
            </div>
            </>
        }
    </div>
  )
}

export default Cart