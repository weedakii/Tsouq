import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import MailIcon from '@mui/icons-material/Mail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_ROLE_RESET } from '../../constants/userConst'
import Loader from '../layout/Loader'
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

const UpdateRole = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const {error, user, loading} = useSelector(state => state.userDetails)
    const {error: errUpdate, loading: loadingUpdate, isUpdated} = useSelector(state => state.updateUser)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const updateUserHundler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("role", role)

        dispatch(updateUser(params.id, myForm))
    }

    useEffect(() => {
        const fetchData = () => {
            if (window.innerWidth > 600 ) {
                setOpen(true)
            }
            if (user && user._id !== params.id) {
                dispatch(getUserDetails(params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setRole(user.role)
            }
            if (error) {
                alert.error(error)
                dispatch(clearErrors)
            }
            if (errUpdate) {
                alert.error(errUpdate)
                dispatch(clearErrors)
            }
            if (isUpdated) {
                alert.success("User Updated Successfully")
                navigate('/admin/users')
                dispatch({type: UPDATE_ROLE_RESET})
            }
        }
        fetchData()
    }, [error, errUpdate, alert, dispatch, navigate, isUpdated, user, params])
  return (
    <>
        <MetaData title="Update User"/>
    {
        loading ? (
            <Loader />
        ) : (
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
            <div className='p-5'>
                <form 
                    className='flex flex-col'
                    encType='multipart/form-data'
                    onSubmit={updateUserHundler}
                >
                    <h3 className='text-slate-800 mb-5 text-center text-2xl font-bold'>Update User</h3>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <SpellcheckIcon />
                        <input 
                            type="text"
                            value={name}
                            name="name"
                            className='inp shipping_inp w-full'
                            placeholder='Product Name'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <MailIcon />
                        <input 
                            type="email"
                            className='inp shipping_inp w-full'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-8 text-slate-600'>
                        <VerifiedUserIcon />
                        <select className={`${role === "admin" ? ' text-green-700 ' : ' text-red-700 '}  inp shipping_inp w-full font-semibold text-lg`} value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" disabled>Choose Role</option>
                            <option value="user" className='text-red-700 font-semibold text-lg'>user</option>
                            <option value="admin" className='text-green-700 font-semibold text-lg '>admin</option>
                        </select>
                    </div>
                    <Button type='submit' variant='contained' color='warning' disabled={loadingUpdate ? true : false}>
                        Update
                    </Button>
                </form>
            </div>
        </div>
        )
    }
    </>
  )
}

export default UpdateRole