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

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const {shippingInfo} = useSelector(state => state.cart)
  const [address, setAddress] = useState(shippingInfo?.address)
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo)
  const [name, setName] = useState(shippingInfo?.name)
  const [state, setState] = useState(shippingInfo?.state)

  const shippingHandler = (e) => {
    e.preventDefault()
    if (phoneNo.length !== 11) {
      alert.error('Phone Number must be 10 digits')
      return;
    }
    dispatch(saveShippingInfo({
      address, name, state, phoneNo
    }))
    navigate('/order/confirm')
  }

  return (
    <div className="grid items-center h-[calc(100vh-58px)]">
      <div className="mt-4">
        <CheckActiveStep activeStep={0} />
      </div>
      <div className="">
        <form 
          onSubmit={shippingHandler}
          encType="multipart/form-data"
          className='p-5 shadow-card mx-auto max-w-sm rounded'
          >
          <h2 className="w-fit mb-5 py-2 px-4 mx-auto border-b-2 border-slate-400 text-slate-600 text-xl font-semibold text-center">shipping details</h2>
          <div className="flex items-center mb-4" >
            <PersonIcon className="text-slate-600" />
            <input 
              type="text"
              placeholder='Name'
              className='shipping_inp inp w-full '
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <HomeIcon className="text-slate-600"/>
            <input 
              type="text"
              placeholder='Address'
              className='shipping_inp inp w-full '
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <PhoneIcon className="text-slate-600"/>
            <input 
              type="number"
              placeholder='Phone'
              className='shipping_inp inp w-full '
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <TransferWithinAStationIcon className="text-slate-600"/>
            <select 
              required
              value={state}
              className='shipping_inp inp w-full '
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" >State</option>
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
          <button 
            disabled={state ? false : true}
            type="submit"
            className="block px-5 py-3 bg-slate-800 text-slate-100 rounded ml-auto hover:rounded-xl active:scale-75"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Shipping