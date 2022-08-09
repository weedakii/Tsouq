import React, { useEffect } from 'react'
import CheckActiveStep from './CheckActiveStep'
import {useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import {Link, useNavigate} from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderAction'

const OrderConfirm = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const {shippingInfo, cartItems} = useSelector(state => state.cart)
  const {error, loading} = useSelector(state => state.createOrder)

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = 20;
  const total = itemsPrice + shippingPrice;

  const orderData = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice: total,
  }
  const createOrderHandler = (e) => {
    e.preventDefault()
    dispatch(createOrder(orderData))
    navigate('/success')
    alert.success("Order successfully created")
  }
  const card = cartItems && cartItems.map((item) => (
    <div 
      key={item.product}
      className="flex h-40 bg-slate-100/50 mb-5 w-[90%] mx-auto rounded-xl overflow-hidden border-2 border-slate-300 max-w-[500px] md:ml-0 md:mr-auto"
    >
      <img src={item.image} alt={item.name} className=" h-full my-auto max-w-[40%] object-cover"/>
      <div className='p-3 flex flex-col justify-between w-full'>
        <div className="block underline w-full font-semibold text-right md:text-xl">
          <Link to={`/product/${item.product}`}>
            {item.name}
          </Link>
        </div>
        <p className="text-mainDarkColor font-semibold text-xl font-mono">${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p className="flex justify-between text-xl font-semibold">Total: <span className='text-red-600 font-bold'>{item.quantity*item.price}$</span></p>
      </div>
    </div>
  ))
  useEffect(() => {
    const fetchData = () => {
      if(error) {
        alert.error(error)
        dispatch(clearErrors())
      }
    }
    fetchData()
  }, [dispatch, alert, error])
  
  return (
    <div>
        <div className="mt-4 ">
            <CheckActiveStep activeStep={1} />
        </div>
        <div className="p-5">
          {/*  */}
          <div>
            <h2 className="font-bold text-xl">Shipping Info:</h2>
            <div className="p-3 w-[300px] shadow-card m-4 mx-auto rounded-xl">
              <div className="flex p-2 mb-3  font-semibold gap-4">
                <p className="font-bold">Name:</p>
                <span>{shippingInfo.name}</span>
              </div>
              <div className="flex p-2 mb-3  font-semibold gap-4">
                <p className="font-bold">Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex p-2 mb-3  font-semibold gap-4">
                <p className="font-bold">Address:</p>
                <span>{shippingInfo.state} - {shippingInfo.address}</span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="md:flex">
            <div className="w-full">
              <h2 className="font-bold text-xl">Your Cart Items:</h2>
              <div className="sm:m-4">
                {
                  card
                }
              </div>
            </div>
            {/*  */}
            <div className="w-full sm:w-3/5 md:w-2/5 lg:w-2/6  mt-6 p-2 h-fit m-auto md:my-auto shadow-card rounded-lg font-mono">
                <h2 className="p-2 bg-slate-200 rounded-lg text-lg pl-4 font-semibold">Order Summery</h2>
                <div className="p-2 my-5 border-y border-slate-300">
                    <p className="flex justify-between text-sm font-semibold mb-2"><span>Items Price:</span> <span className="text-slate-500">{itemsPrice}$</span></p>
                    <p className="flex justify-between text-sm font-semibold"><span>Shipping Price:</span> <span className="text-slate-500">{shippingPrice}$</span></p>
                </div>
                <p className="flex justify-between text-xl pb-3 font-semibold border-b border-slate-300"><span>Total:</span> <span className="text-red-600">{total}$</span></p>
                <button 
                    disabled={loading ? true : false}
                    onClick={createOrderHandler}
                    className="block my-3 mx-auto p-2 text-center rounded-lg
                      font-semibold text-lg bg-slate-800 text-slate-50 w-[90%] hover:rounded-full hover:bg-emerald-900 transition duration-300 active:scale-50"
                  >
                    Make The Order
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default OrderConfirm