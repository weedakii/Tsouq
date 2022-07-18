import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, forgotPassword } from '../../actions/userAction'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'


const ForgotPassword = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error, loading, message} = useSelector(state => state.forgotPassword)


    const [email, setEmail] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("email", email)
    
        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    
        if (message) {
            alert.success(message)
        }
    }, [error, alert, dispatch, message])
  return (
    <>
    <MetaData title="Fogot Password" />
    {
        loading ? (
            <Loader />
        ) : (
        <div className="grid place-items-center w-full h-[calc(100vh-58px)]">
            <div>
                <form onSubmit={handleUpdate} className='p-5 border w-80 border-slate-400 my-10 shadow-[0_0_15px_1px_#ccc] rounded-xl'>
                    <h2 className="p-2 border-b border-slate-500 font-semibold text-slate-700 text-xl w-fit mx-auto mb-7">Fogot Password</h2>
                    <div className="w-full flex flex-col font-mono text-lg mb-4">
                        <label htmlFor="oldPass">*email</label>
                        <input className="inp" 
                        type="email" 
                        id='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="Email"/>
                    </div>
                    <button type="submit" className="mt-8 block w-full py-2 px-7 bg-slate-800 text-slate-50">Send</button>
                </form>
            </div>
        </div>
        )
    }
    </>
  )
}

export default ForgotPassword