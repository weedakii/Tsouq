import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, CircularProgress } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { clearErrors, login } from '../../actions/userAction'
import Loader from '../layout/Loader'
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios'
import MetaData from '../layout/MetaData'

const Signin = () => {
  const alert = useAlert()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let darkMode = localStorage.getItem("isDark")
  const initialState = {email: '', password: ''}
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const {error, loading, isAuthenticated} = useSelector(state => state.user)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]:value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId: 'your client id will be display here',
      plugin_name: "chat"
  })})

  const responseSuccessGoogle = (response) => {
    axios({
      method: 'POST',
      url: '/api/v1/googleLogin',
      data: {tokenId: response.tokenId}
    }).then(res => {
      if (res.statusText === "OK") {
        window.location = '/profile'
      }
    })
  }

  const responseFailureGoogle = (response) => {
    console.log(response);
  }
  let redirect = location.search ? location.search.split('=')[1] : '/profile'
  if (redirect === 'shipping') {
    redirect = '/shipping'
  }

  useEffect(() => {
    const fetchData = () => {
      if (error) {
        alert.error(error)
        dispatch(clearErrors)
      }
  
      if (isAuthenticated) {
        navigate(redirect)
      }
    }
    fetchData()
  }, [dispatch, isAuthenticated, navigate, error, alert, redirect])
  
  return (
    <div className={(darkMode === "true") ? "dark" : ''}>
      <MetaData title={`تسجيل الدخول - تسوق`} />
      <div className="grid bg-cyan-100/20 place-items-center h-auto min-h-[calc(100vh-58px)] dark:bg-slate-800">
          {
            loading ? (
              <Loader />
            ) : (
              <>
              <form dir='rtl' onSubmit={handleLogin} className="relative dark:bg-slate-700 dark:shadow-[0_0_10px_1px_#444] w-full max-w-[320px] rounded-md text-right flex flex-col bg-white px-7 pt-14 pb-7 font-tajawal shadow-[0_0_20px_8px_#ddd]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <Avatar sx={{ width: '65px', height: '65px' }} className="bg-gradient-to-r from-emerald-800 to-emerald-500 shadow-lg shadow-slate-300" />
              </div>
              <div dir='ltr' className="text-center my-6">
                <GoogleLogin
                  clientId="14928484089-aq5ckopm9jf0eu8ricjapu1nin9fdami.apps.googleusercontent.com"
                  buttonText="سجل بواسطة جوجل"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={'single_host_origin'}
                  // uxMode='redirect'
                  className="ggl_btn"
                />
              </div>
              <label htmlFor="email" className="dark:text-slate-200">البريد الالكتروني</label>
              <input type="email" id="email" placeholder="الايميل" 
                  className="inp" name="email" value={email} onChange={handleChangeInput}
              />
              <label htmlFor="password" className="dark:text-slate-200">الرقم السري</label>
              <input 
                type="password" 
                className="inp" 
                id="password" 
                placeholder="الرقم السري"
                name='password'
                value={password} onChange={handleChangeInput}
              />
              {/* <Link to="/password/forgot"><p className='text-emerald-700 text-sm dark:text-emerald-400 text-end underline'>Forgot your password?</p></Link> */}
              <button disabled={loading ? true : false} type="submit" className="btn">
                سجل الدخول
                {loading && <CircularProgress color="success" />}
              </button>
              <p className="dark:text-slate-200 font-tajawal">لاأمتلك حساب؟ <Link to="/register">
                  <span className="text-emerald-700 font-semibold dark:text-emerald-400">انشئ حساب الأن</span>
                  </Link></p>
            </form>
            </>
            )
          }
      </div>
    </div>
  )
}

export default Signin