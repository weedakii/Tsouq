import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Avatar, CircularProgress } from '@mui/material'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import { clearErrors, register } from '../../actions/userAction'
import MetaData from '../layout/MetaData'

const Register = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  let darkMode = localStorage.getItem("isDark")
  const initialState = {name: '', email: '', password: '', cf_password: ''}
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData

  const [avatar, setAvatar] = useState()
  // const [avatarPreview, setAvatarPreview] = useState('')

  const { loading, isAuthenticated, error} = useSelector(state => state.user)

  const handleChangeInput = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result)
          // setAvatarPreview(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      const { name, value } = e.target
      setUserData({...userData, [name]:value})
    } 
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    myForm.set("avatar", avatar)

    dispatch(register(myForm))
  }

  useEffect(() => {
    const fetchData = () => {
      if (error) {
        alert.error(error)
        dispatch(clearErrors())
      }
  
      if (isAuthenticated) {
        window.location = '/profile'
      }
    }
    fetchData()
  }, [error, alert, dispatch, isAuthenticated])
  

  return (
    <div className={(darkMode === "true") ? " dark h-full " : 'h-full'}>
      <MetaData title={`انشاء حساب - تسوق`} />
      <div className="grid dark:bg-slate-800 bg-cyan-100/20 place-items-center h-full min-h-[calc(100vh-52px)]">
          <form dir='rtl' className="my-10 relative rounded-md dark:bg-slate-700 dark:shadow-[0_0_10px_1px_#444] w-full max-w-[320px] text-right flex flex-col bg-white px-7 pt-14 pb-7  shadow-[0_0_20px_8px_#ddd]" onSubmit={handleRegister}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 ">
                  <Avatar sx={{ width: '65px', height: '65px' }} className="bg-gradient-to-r from-emerald-800 to-emerald-600 shadow-2xl shadow-slate-400" />
              </div>
              <label htmlFor="name" className="dark:text-slate-200 mt-4">اسم المستخدم</label>
              <input required type="text" id="name" placeholder="اسمك" 
                  className="inp" name="name" value={name} onChange={handleChangeInput}
              />
              <label htmlFor="email" className="dark:text-slate-200">البريد الالكتروني</label>
              <input required type="email" id="email" placeholder="الايميل" 
                  className="inp" name="email" value={email} onChange={handleChangeInput}
              />
              <label htmlFor="password" className="dark:text-slate-200">الرقم السري</label>
              <input required type="password" className="inp" id="password" placeholder="الرقم السري" name="password" value={password} onChange={handleChangeInput}/>
              <label htmlFor="cf_password" className="dark:text-slate-200">ادخل الرقم السري مرة اخري</label>
              <input required type="password" className="inp" id="cf_password" placeholder="الرقم السري مرة اخري" name='cf_password' value={cf_password} onChange={handleChangeInput}/>
              {/* <div className="flex items-center gap-4">
                <Avatar src={avatarPreview} />
                <input 
                  type="file"
                  accept='image/*'
                  name="avatar"
                  onChange={handleChangeInput}
                  className="inp_file  dark:outline-slate-200 outline-slate-500 outline-dashed outline-2"
                />
              </div> */}
              <button disabled={loading ? true : false} type="submit" className="btn">
                انشاء حساب
                {loading && <CircularProgress color="success" />}
              </button>
              <p className="font-tajawal dark:text-slate-200">انا امتلك حساب بالفعل؟ <Link to="/signin">
                  <span className="text-emerald-700 font-semibold dark:text-emerald-500"> سجل الان</span>
                  </Link></p>
          </form>
      </div>
    </div>
  )
}

export default Register