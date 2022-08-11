import React, { useState, useRef, useEffect  } from 'react'
import emailjs from '@emailjs/browser';
import {Button} from '@mui/material'
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const ContactUs = () => {
  const {user} = useSelector(state => state.user)
  const form = useRef();
  const alert = useAlert();
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_crfxlv1', form.current, '4uoWAHbXzywsfsWcF')
      .then((result) => {
          console.log(result.text);
          alert.success('Message Sent Successfully')
      }, (error) => {
          console.log(error.text);
          alert.error("We Are sorry, it seems that something wrong happend")
      });
  };

  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
      setPhone(user?.phoneNo)
    }
  }, [user])
  

  return (
    <div className='w-full h-full flex-auto grid place-items-center'>
      <form ref={form} dir='rtl' onSubmit={sendEmail} className='flex flex-col sm:w-3/5 w-[95%] m-auto p-4 border border-slate-400 rounded-lg shadow-2xl'>
        {/* Name */}
        <div className='flex flex-col mb-3 '>
          <label htmlFor="name">*الاسم</label>
          <input
            type="text"
            id='name'
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="اسمك"
            className='inp shipping_inp'
          />
        </div>
        {/* Phone */}
        <div className='flex flex-col mb-3'>
          <label htmlFor="phone">*الهاتف المحمول</label>
          <input
            type="number"
            id='phone'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="الهاتف"
            className='inp shipping_inp'
          />
        </div>
        {/* Email */}
        <div className='flex flex-col mb-3'>
          <label htmlFor="email">*البريد الاكتروني</label>
          <input
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="الايميل"
            className='inp shipping_inp'
          />
        </div>
        {/* Message */}
        <div className='flex flex-col mb-3'>
          <label htmlFor="message">*الرسالة</label>
          <textarea 
            name="message"
            id="message"
            cols="30"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اترك رساله"
            className='inp shipping_inp'
          />
        </div>
        <Button type='submit' variant='contained' color='success'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default ContactUs