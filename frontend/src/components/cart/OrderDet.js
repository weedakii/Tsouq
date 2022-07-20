import React, { useEffect } from 'react'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, orderDetails } from '../../actions/orderAction'
import { useParams, Link } from 'react-router-dom';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const OrderDet = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, order} = useSelector(state => state.orderDetails)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(orderDetails(params.id))
    }, [dispatch, error, alert, params])
    
return (
    <>
        <MetaData title={`Order Details`} />
        {
            loading ? (
                <Loader />
            ) : (
                <div className="p-5 sm:w-4/5 mx-auto">
                    <h2 className="text-orange-600 sm:text-xl sm:font-bold text-lg font-semibold text-center">OrderID #{order && order?._id}</h2>
                    {/*  */}
                    <div className="my-5 flex gap-4 justify-around sm:flex-row flex-col">
                        <div>
                            <h3 className="text-slate-800 sm:text-2xl sm:font-bold text-xl font-semibold">Shipping Info</h3>
                            <div className="order-card flex flex-col gap-2">
                                <p>{order.shippingInfo && order.shippingInfo.name}</p>
                                <p>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                <p>{order.shippingInfo && order.shippingInfo.state}, {order.shippingInfo && order.shippingInfo.address}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-800 sm:text-2xl sm:font-bold text-xl font-semibold">Total</h3>
                            <div className="order-card">
                                <p className="text-red-600 font-bold">{order?.totalPrice}$</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-800 sm:text-2xl sm:font-bold text-xl font-semibold">Order Status</h3>
                            <div className="order-card">
                                <p className={
                                    order.orderStatus && order.orderStatus === "Delivered" ? "text-green-700" : order?.orderStatus === "Shipping" ? "text-slate-900" : "text-red-700"
                                }>{order.orderStatus && order.orderStatus}</p>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div>
                        {
                            order.orderItems && order.orderItems.map(i => (
                                <div className="mb-4 p-2 border-b border-slate-500 flex gap-2 items-center" key={i._id}>
                                    <img src={i.image} alt={i.name} width='100' />
                                    <Link to={`product/${i._id}`} className="underline font-semibold">{i.name}</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    </>
)
}

export default OrderDet