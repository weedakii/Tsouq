import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import { clearErrors, getCarusels } from '../../actions/caruselsAction'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

const AdminCarusels = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {loading, error, carusel} = useSelector(state => state.carusels)

    const columns = [
        {field: "id", headerName: "Carusel ID", minWidth: 220, flex: 0.5},
        {field: "name", headerName: "Name", minWidth: 220, flex: 1},
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
                    <Link to={`/admin/carusel/${params.getValue(params.id, "id")}`}>
                        <EditIcon />
                    </Link>
                    </>
                )
            }
        },
    ]
    const rows = []

    carusel && carusel.forEach(p => (
        rows.push({
            id: p._id,
            name: p.public_id
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
            dispatch(getCarusels())
        }
        fetchData()
    }, [dispatch, alert, error, navigate])
  return (
    <>
        <MetaData title="الادمن - جميع البانرات"/>
        <div className="flex-1 sm:grid-cols-sid grid-cols-1 grid sm:p-3 p-2 w-screen max-w-[100%]">
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
                            <h2 className="text-center font-bold text-3xl mb-7 mt-4 text-slate-700">جميع البانرات</h2>
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

export default AdminCarusels