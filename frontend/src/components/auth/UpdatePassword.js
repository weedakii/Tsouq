import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate} from 'react-router-dom'
import { clearErrors, updatePassword } from '../../actions/userAction'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConst'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, loading, isUpdated} = useSelector(state => state.updateUser)


    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("oldPassword", oldPass)
        myForm.set("newPassword", newPass)
    
        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        const fetchData = () => {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
        
            if (isUpdated) {
                alert.success('Password Updated successfully')
                navigate('/profile')
                dispatch({type: UPDATE_PASSWORD_RESET})
            }
        }
        fetchData()
    }, [error, alert, dispatch, navigate, isUpdated])
  return (
    <>
    <MetaData title="Password Updated" />
    {
        loading ? (
            <Loader />
        ) : (
        <div className="grid place-items-center w-full h-[calc(100vh-58px)]">
            <div>
                <form onSubmit={handleUpdate} className='p-5 border border-slate-400 my-10 shadow-[0_0_15px_1px_#ccc] rounded-xl'>
                    <h2 className="p-2 border-b border-slate-500 font-semibold text-slate-700 text-xl w-fit mx-auto mb-7">Update Password</h2>
                    <div className="w-full flex flex-col font-mono text-lg mb-4">
                        <label htmlFor="oldPass">*Old Password</label>
                        <input className="inp" 
                        type="password" 
                        id='oldPass' 
                        value={oldPass} 
                        onChange={(e) => setOldPass(e.target.value)}
                        name="oldPassword"
                        placeholder="old Password"/>
                    </div>
                    <div className="w-full flex flex-col font-mono text-lg mb-4">
                        <label htmlFor="newPass">*New Password</label>
                        <input className="inp" 
                        type="password"
                        id='newPass' 
                        value={newPass} 
                        onChange={(e) => setNewPass(e.target.value)}
                        name="newPassword"
                        placeholder="new Password"/>
                    </div>
                    <button type="submit" className="mt-8 block w-full py-2 px-7 bg-slate-800 text-slate-50">Confirm Password</button>
                </form>
            </div>
        </div>
        )
    }
    </>
  )
}

export default UpdateProfile