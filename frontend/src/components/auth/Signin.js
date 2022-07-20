import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { clearErrors, login } from '../../actions/userAction'
import Loader from '../layout/Loader'
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios'

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

  window.gapi.load('client:auth2', () => {
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
console.log(location.search.split('=')[1]);
  let redirect = location.search ? location.search.split('=')[1] : '/profile'
  if (redirect === 'shipping') {
    redirect = '/shipping'
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }

    if (isAuthenticated) {
      navigate(redirect)
    }
  }, [dispatch, isAuthenticated, navigate, error, alert, redirect])
  
  return (
    <div className={(darkMode === "true") ? "dark" : ''}>
      <div className="grid bg-cyan-100/20 place-items-center h-auto min-h-[calc(100vh-58px)] dark:bg-slate-800">
          {
            loading ? (
              <Loader />
            ) : (
              <>
              <form onSubmit={handleLogin} className="relative dark:bg-slate-700 dark:shadow-[0_0_10px_1px_#444] w-full max-w-[320px] rounded-md text-left flex flex-col bg-white px-7 pt-14 pb-7 font-medium shadow-[0_0_20px_8px_#ddd]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                  <Avatar sx={{ width: '65px', height: '65px' }} className="bg-gradient-to-r from-orange-300 to-yellow-200 shadow-2xl shadow-slate-400" />
              </div>
              <div className="text-center">
                <GoogleLogin
                  clientId="14928484089-aq5ckopm9jf0eu8ricjapu1nin9fdami.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={'single_host_origin'}
                  // uxMode='redirect'
                  // className="ggl_btn"
                />
              </div>
              <label htmlFor="email" className="dark:text-slate-200">Email</label>
              <input type="email" id="email" placeholder="Your email" 
                  className="inp" name="email" value={email} onChange={handleChangeInput}
              />
              <label htmlFor="password" className="dark:text-slate-200">Password</label>
              <input 
                type="password" 
                className="inp" 
                id="password" 
                placeholder="Your password"
                name='password'
                value={password} onChange={handleChangeInput}
              />
              <Link to="/password/forgot"><p className='text-orange-700 sm:text-base text-sm dark:text-orange-300 text-end underline'>Forgot your password?</p></Link>
              <button disabled={loading ? true : false} type="submit" className="btn">Sign in</button>
              <p className="dark:text-slate-200 sm:text-base text-sm font-serif">You donnot have an account? <Link to="/register">
                  <span className="text-orange-700 dark:text-orange-400">Register</span>
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