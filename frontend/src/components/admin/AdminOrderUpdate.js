import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, orderDetails, updateOrder } from '../../actions/orderAction'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UPDATE_ORDER_RESET } from '../../constants/orderConst'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';


const AdminOrderUpdate = () => {
  const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

  const params = useParams()
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, order} = useSelector(state => state.orderDetails)
    const { error: errorUpdate, isUpdated} = useSelector(state => state.order)
    const [status, setStatus] = useState("")

    const UpdateStatusHandler = (e) => {
      e.preventDefault()
      const myForm = new FormData()
      myForm.set("status", status)
      dispatch(updateOrder(params.id, myForm))
    }

    useEffect(() => {
      const fetchData = () => {
        if (window.innerWidth > 600 ) {
          setOpen(true)
        }
        if (order && order._id !== params.id) {
          dispatch(orderDetails(params.id))
        } else {
            setStatus(order.orderStatus)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (errorUpdate) {
            alert.error(errorUpdate)
            dispatch(clearErrors())
        }
        if (isUpdated) {
          alert.success("Order Updated Successfully")
          navigate(`/admin/order/${params.id}`)
          dispatch({type: UPDATE_ORDER_RESET})
        }
      }
      fetchData()
    }, [dispatch, error, alert, params, order, errorUpdate, navigate, isUpdated])
  return (
    <>
        <MetaData title={`All - Orders`} />
        <div className="sm:grid-cols-sid grid-cols-1 grid sm:p-3 p-2 w-screen max-w-[100%]">
        <div className="relative sm:max-w-[250px] sm:min-w-[200px] z-10 bg-white">
                <div className='sm:hidden'>
                    <Button onClick={handleOpen} >
                    {
                        open ? <CloseIcon fontSize='large' color='error' /> 
                        : <SortIcon fontSize='large' color='info' />
                    }
                    </Button>

                </div>
                <div className={`${open ? 'block' : 'hidden'}`}>
                    <Sidebar />
                </div>
              </div>
            <div className="sm:p-2 p-1 sm:w-4/5 ">
                    <h2 className="text-orange-600 sm:text-lg text-sm font-semibold sm:text-center">OrderID #{order && order?._id}</h2>
                    <h2 className="text-gray-500 mt-8 sm:text-lg text-sm flex flex-col">CreatedAt: 
                      <span className='ml-8'>Year: {order && order?.createdAt?.slice(0, 10)}</span>
                      <span className='ml-8'>Hour: {new Date(order?.createdAt).getHours()}:{new Date(order?.createdAt).getMinutes()}</span>
                    </h2>
                    {
                      order.deliveredAt && (
                        <h2 className="text-gray-500 mt-8 sm:text-lg text-sm flex flex-col">DeliveredAt: 
                          <span className='ml-8'>Year: {order && order?.deliveredAt?.slice(0, 10)}</span>
                          <span className='ml-8'>Hour: {new Date(order?.deliveredAt).getHours()}:{new Date(order?.deliveredAt).getMinutes()}</span>
                        </h2>
                      )
                    }
                    {/*  */}
                    <div className="my-5 flex gap-4 justify-start md:flex-row flex-wrap flex-col">
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
                            <form className="order-card flex flex-col gap-4" onSubmit={UpdateStatusHandler}>
                                <select
                                  disabled={order.orderStatus === "Delivered" ? true : false}
                                  className={` ${
                                    status === "Delivered" ? "text-green-700" : status === "Shipping" ? "text-slate-900" : "text-red-700"
                                  }  p-2 text-base rounded-lg outline-2 outline-offset-2 shadow-sh hover:shadow-[inset_0px_0px_4px_2px_#a2a2a2] focus:shadow-[inset_0px_0px_4px_2px_#a2a2a2] outline outline-slate-400 w-full`}
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option disabled value="" className='text-slate-800 font-semibold'>Choose Status</option>
                                  <option value="Processing" className='text-red-500 font-semibold'>Processing</option>
                                  <option value="Shipping" className='text-slate-800 font-semibold'>Shipping</option>
                                  {
                                    order.orderStatus && (order?.orderStatus === "Shipping" || status === "Delivered") &&
                                      <option value="Delivered" className='text-green-500 font-semibold'>Delivered</option>
                                  }
                              </select>
                              <Button
                                variant='contained'
                                sx={{width: 'fit-content', marginLeft: 'auto'}}
                                type='submit'
                                disabled={
                                  loading ? true : false || status === "" ? true : false || order?.orderStatus === "Delivered" ? true : false
                                }
                              >
                                Update
                              </Button>
                            </form>
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
        </div>
    </>
  )
}

export default AdminOrderUpdate