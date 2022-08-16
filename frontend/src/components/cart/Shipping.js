import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useAlert } from 'react-alert';
import { State } from 'country-state-city';
import CheckActiveStep from './CheckActiveStep';
import { saveShippingInfo } from '../../actions/cartActions';
import MetaData from '../layout/MetaData';

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const {shippingInfo} = useSelector(state => state.cart)
  const [address, setAddress] = useState(shippingInfo?.address)
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo)
  const [name, setName] = useState(shippingInfo?.name)
  const [state, setState] = useState(shippingInfo?.state)
  const [message, setMessage] = useState('')

  const shippingHandler = (e) => {
    e.preventDefault()
    if (phoneNo.length !== 11) {
      alert.error('Phone Number must be 11 digits')
      return;
    }
    dispatch(saveShippingInfo({
      address, name, state, phoneNo, message
    }))
    navigate('/order/confirm')
  }

  return (
    <div className="flex-auto grid items-center ">
      <MetaData title={`بيانات المستلم`} />
      <div className="mt-4">
        <CheckActiveStep activeStep={0} />
      </div>
      <div dir='rtl' className="my-5">
        <form 
          onSubmit={shippingHandler}
          encType="multipart/form-data"
          className='p-5 shadow-card mx-auto max-w-sm rounded'
          >
          <h2 className="w-fit mb-5 py-2 px-4 mx-auto border-b-2 border-slate-400 text-slate-600 text-xl font-semibold text-center">معلومات التوصيل</h2>
          <div className="flex items-center mb-4 gap-2" >
            <PersonIcon className="text-slate-600" />
            <input 
              type="text"
              placeholder='اسمك بالكامل'
              className='shipping_inp inp w-full '
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4 gap-2">
            <PhoneIcon className="text-slate-600"/>
            <input 
              type="رقم الهاتف"
              placeholder='Phone'
              className='shipping_inp inp w-full '
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4 gap-2">
            <HomeIcon className="text-slate-600"/>
            <input 
              type="text"
              placeholder='العنوان'
              className='shipping_inp inp w-full '
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4 gap-2">
            <TransferWithinAStationIcon className="text-slate-600"/>
            <select 
              required
              value={state}
              className='shipping_inp inp w-full '
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" >محل الاقامة</option>
              {
                State && 
                  State.getStatesOfCountry('EG').map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))
              }
            </select>
          </div>
          <div className="flex flex-col mb-4 gap-2">
            <label htmlFor="mesg" className='font-semibold text-emerald-700'>*ملاحظاتك</label>
            <textarea 
              placeholder='اترك اي ملاحظات بشأن اي منتج سواء كانت من حيث اللون او الحجم او تاريخ التوصيل لضمان خدمة افضل'
              className='shipping_inp inp w-full '
              id='mesg'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols={20}
              rows={10}
            />
          </div>
          <button 
            disabled={state ? false : true}
            type="submit"
            className="block px-5 py-3 bg-slate-800 text-slate-100 rounded mr-auto hover:rounded-xl active:scale-75"
          >
            التالي
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping