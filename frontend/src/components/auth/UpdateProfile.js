import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate} from 'react-router-dom'
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { UPDATE_USER_RESET } from '../../constants/userConst'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const {error, loading, isUpdated} = useSelector(state => state.updateUser)


    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState(0)
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState()

    const handleChangeInput = (e) => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("lastName", lastName)
        myForm.set("phoneNo", phoneNo)
        myForm.set("address", address)
        myForm.set("avatar", avatar)
    
        dispatch(updateProfile(myForm))
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user?.avatar?.url)
            setLastName(user?.lastName)
            setPhoneNo(user?.phoneNo)
            setAddress(user?.address)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    
        if (isUpdated) {
            alert.success('Profile Updated successfully')
            dispatch(loadUser())
            navigate('/profile')
            dispatch({type: UPDATE_USER_RESET})
        }
    }, [error, alert, dispatch, navigate, isUpdated, user])
  return (
    <>
    <MetaData title="Profile Updated" />
    {
        loading ? (
            <Loader />
        ) : (
            <div className="grid place-items-center">
        <form onSubmit={handleUpdate} className='sm:p-5 p-2 sm:border sm:border-slate-400 my-7 sm:shadow-[0_0_15px_1px_#ccc] sm:rounded-xl'>
            <div className="flex items-center gap-4 mb-8 mt-4">
                <Avatar src={avatarPreview} />
                <input 
                type="file"
                accept='image/*'
                name="avatar"
                onChange={handleChangeInput}
                className="inp_file w-full dark:outline-slate-200 outline-slate-500 outline-dashed outline-2"
                />
            </div>
            <div className="flex">
                <div className="w-full flex flex-col font-mono text-lg">
                    <label htmlFor="name">*Name</label>
                    <input className="inp_profile" 
                    type="text" 
                    id='name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    name="name"

                    placeholder="name"/>
                </div>
                <div className="w-full flex flex-col font-mono text-lg mb-4">
                    <label htmlFor="lastname">*Last Name</label>
                    <input className="inp_profile" 
                    type="text" 
                    id='lastname' 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"

                    placeholder="Last name"/>
                </div>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="email">*Email</label>
                <input className="inp_profile" 
                type="email" 
                id='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"/>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="phone">*Phone</label>
                <input className="inp_profile" 
                type="number"
                id='phone' 
                value={phoneNo} 
                onChange={(e) => setPhoneNo(e.target.value)}
                name="phoneNo"
                placeholder="Phone"/>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="address">*Address</label>
                <input className="inp_profile" 
                type="text"
                id='address' 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                name="address"
                placeholder="Address"/>
            </div>
            <button type="submit" className="mt-8 block ml-auto py-2 px-7 bg-slate-800 text-slate-50">Edit</button>
        </form>
    </div>
        )
    }
    </>
  )
}

export default UpdateProfile