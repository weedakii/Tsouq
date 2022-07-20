import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MetaData from '../layout/MetaData';
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderAction';
import { Button } from '@mui/material';
import { DELETE_ORDER_RESET } from '../../constants/orderConst';

const AdminOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, orders} = useSelector(state => state.allOrders)
    const { error: deleteError, isDeleted} = useSelector(state => state.order)

    const deleteOrderHundler = (id) => {
        dispatch(deleteOrder(id))
    }
    const columns= [
        {field: "id", headerName: "Order ID", minWidth: 270, flex: 1},
        {
            field: "status", headerName: "Status", minWidth: 120, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "text-green-700" : params.getValue(params.id, "status") === "Shipping" ? "text-slate-900" : "text-red-700";
            }
        },
        {field: "itemsQty", headerName: "items Qty", type: "number", minWidth: 100, flex: 0.3},
        {field: "amount", headerName: "Amount", type: "number", minWidth: 150, flex: 0.5},
        {
            field: "open", headerName: "Open", minWidth: 120, 
            type: "number", flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>
                    <Button color='error' onClick={() => deleteOrderHundler(params.getValue(params.id, "id"))}>
                        <DeleteIcon />
                    </Button>
                    </>
                )
            }
        },
    ]
    const rows= []
    orders && orders.forEach((e, i) => {
        rows.push({
            itemsQty: e.orderItems.length,
            id: e._id,
            status: e.orderStatus,
            amount: e.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully")
            navigate(`/admin/orders`)
            dispatch({type: DELETE_ORDER_RESET})
        }
        dispatch(allOrders())
    }, [dispatch, error, alert, deleteError, isDeleted, navigate])
  return (
    <>
        <MetaData title={`All - Orders`} />
        <div className="sm:grid-cols-sid grid-cols-1 grid sm:p-3 p-2 w-screen max-w-[100%]">
            <div className="sm:max-w-[200px] sm:min-w-[190px]">
                <Sidebar />
            </div>
            <div className="p-1">
                <h2 className="text-center font-bold text-3xl mb-10 mt-5 text-slate-700">All Orders</h2>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    disableSelectionOnClick
                />
            </div>
        </div>
    </>
  )
}

export default AdminOrders