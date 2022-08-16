import React, { useEffect } from 'react'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { clearErrors, myOrders } from '../../actions/orderAction'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';


const UserOrders = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, orders} = useSelector(state => state.myOrders)
    const {user} = useSelector(state => state.user)
    
    const columns= [
        {field: "id", headerName: "Order ID", minWidth: 270, flex: 1},
        {
            field: "status", headerName: "Status", minWidth: 120, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? 'text-green-700' : params.getValue(params.id, "status") === "Shipping" ? "text-slate-900" : "text-red-700";
            }
        },
        {field: "itemsQty", headerName: "items Qty", type: "number", minWidth: 100, flex: 0.3},
        {field: "amount", headerName: "Amount", type: "number", minWidth: 150, flex: 0.5},
        {
            field: "open", headerName: "Open", minWidth: 120, 
            type: "number", flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/orders/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
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
        const fetchData = () => {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            dispatch(myOrders())
        }
        fetchData()
    }, [dispatch, error, alert])

return (
    <>
    <MetaData title={`${user?.name} - اوردرات - تسوق`} />
        {
            loading ? (
                <Loader />
            ) : (
                <div className="p-5">
                    <h2 className="text-center font-bold text-3xl mb-10 mt-5 text-slate-700">{user?.name}'s Orders</h2>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        disableSelectionOnClick
                    />
                </div>
            )
        }
    </>
)
}

export default UserOrders