import { Avatar } from '@mui/material'
import Loader from '../layout/Loader'
import React, { useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { useAlert} from 'react-alert'
import { clearErrors } from '../../actions/userAction'

const lists = [
  'My Profile',
  'My Orders',
  'My Cart',
  'My Last Seen',
  'Settings'
]

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const params = useParams()
  const isActive = (r) => {
    if (r === params.keyword) {
      return ' bg-slate-800 text-slate-100 rounded-tr-none -mx-[1px] rounded-br-none'
    } else {
      return ' bg-slate-50'
    }
  }

  const {loading, error, user, isAuthenticated} = useSelector(state => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isAuthenticated === false && loading === false) {
      alert.info('you are not loggin')
      navigate('/signin')
    }
  }, [dispatch, error, alert, isAuthenticated, loading, navigate])
  
  
  return (
    <>
    {
      loading ? (
        <Loader />
      ) : (
        <div className="flex sm:p-8 p-2">
        <div className="hidden md:block w-1/4 border-r  border-slate-600">
          <ul className="list-none">
            {
              lists.map(i => <Link key={i} to={`/profile/${i}`}><li className={"m-3 p-2 mb-4 border border-slate-600 rounded-full hover:bg-slate-800 hover:text-slate-100 hover:rounded-tr-none hover:-mx-[1px] hover:rounded-br-none duration-400 transition-all " + isActive(i)}>
                {i}
              </li></Link>)
            }
          </ul>
        </div>
        <div className='w-full p-3'>
          <div className='relative h-48 bg-gradient-to-br from-orange-400 to-amber-300'>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full shadow-[0px_10px_30px_-5px_#444]"><Avatar src={user && user?.avatar?.url} sx={{width: '80px', height: '80px'}} /></div>
          </div>
          <div className='mt-20'>
            <div className="w-full flex gap-5 z-[-1] justify-end font-mono text-lg mb-8">
              <Link to='/me/update'><button className='py-2 px-5 bg-slate-800 text-slate-50'>Edit Profile</button></Link>
              <Link to='/password/update'><button className='py-2 px-5 bg-lime-800 text-slate-50'>Change Password</button></Link>
            </div>
            <div className="flex">
              <div className="w-full flex flex-col font-mono text-lg">
                <label htmlFor="name">*Name</label>
                <input className="inp_profile" 
                  type="text" 
                  id='name' 
                  value={user?.name} 
                  disabled
                  placeholder="name"/>
              </div>
              <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="lastname">* Last Name</label>
                <input className="inp_profile" 
                  type="text" 
                  id='lastname' 
                  value={user?.lastName} 
                  disabled
                  placeholder="Last name"/>
              </div>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="email">*Email</label>
                <input className="inp_profile" 
                  type="email" 
                  id='email' 
                  value={user?.email} 
                  disabled
                  placeholder="Email"/>
              </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="phone">*Phone</label>
                <input className="inp_profile" 
                  type="number"
                  id='phone' 
                  value={user?.phoneNo} 
                  disabled
                  placeholder="Phone"/>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="address">*Address</label>
                <input className="inp_profile" 
                  type="text"
                  id='address' 
                  value={user?.address} 
                  disabled
                  placeholder="Address"/>
            </div>
            <div className="w-full flex flex-col font-mono text-lg mb-4">
                <label htmlFor="createdAt">*Joined On</label>
                <input className="inp_profile" 
                  type="text"
                  id='createdAt' 
                  value={String(user?.createdAt).slice(0,10)} 
                  placeholder="Address"
                  disabled
                />
            </div>
          </div>
        </div>
    </div>
      )
    }
    </>
  )
}

export default Profile