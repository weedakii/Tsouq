import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material'
import { DELETE_PRODUCT_RESET } from '../../constants/productConst'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

const AdminProducts = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, products} = useSelector(state => state.adminProducts)
    const { error: deleteError, isDeleted} = useSelector(state => state.deleteProduct)

    const deleteProductHundler = (id) => {

        dispatch(deleteProduct(id))
    }

    const columns = [
        {field: "id", headerName: "Products ID", minWidth: 220, flex: 0.5},
        {field: "name", headerName: "Name", minWidth: 220, flex: 1},
        {field: "stock", headerName: "Stock", type: "number", minWidth: 120, flex: 0.3},
        {field: "price", headerName: "Price", type: "number", minWidth: 140, flex: 0.5},
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 170,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>
                    <Button color='error' onClick={() => deleteProductHundler(params.getValue(params.id, "id"))}>
                        <DeleteIcon />
                    </Button>
                    </>
                )
            }
        },
    ]
    const rows = []

    products && products.forEach(p => (
        rows.push({
            id: p._id,
            stock: p.stock,
            price: p.price,
            name: p.name
        })
    ))

    useEffect(() => {
        const fetchData = () => {
            if (window.innerWidth > 600 ) {
                setOpen(true)
            }
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            if (deleteError) {
                alert.error(deleteError)
                dispatch(clearErrors())
            }
            if (isDeleted) {
                alert.success("Product Deleted Successfully")
                navigate(`/admin/dashboard`)
                dispatch({type: DELETE_PRODUCT_RESET})
            }
            dispatch(getAdminProducts())
        }
        fetchData()
    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    return (
        <>
            <MetaData title="Admin Products"/>
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
                <div>
                    {
                        loading === true ? (
                            <Loader />
                        ) : (
                            <div className="">
                                <h2 className="text-center font-bold text-3xl mb-7 mt-4 text-slate-700">All Products</h2>
                                <DataGrid 
                                    rows={rows}
                                    columns={columns}
                                    pageSize={8}
                                    rowsPerPageOptions={[8]}
                                    disableSelectionOnClick
                                    autoHeight
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default AdminProducts