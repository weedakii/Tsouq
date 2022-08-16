import React from 'react'
import CheckActiveStep from './CheckActiveStep'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Success = () => {
  return (
    <>
    <MetaData title={`نجاح الشراء`} />
        <div className="mt-4 h-full">
            <CheckActiveStep activeStep={2} />
        </div>
        <div className="m-auto flex flex-col items-center justify-center text-center h-[50vh]">
            <CheckCircleIcon sx={{fontSize: '70px'}} className="text-red-500"/>
            <h2 className="text-2xl font-bold my-4 text-slate-700">تم انشاء الاوردر بنجاح سيتم التواصل معك قريبا لمتابعة التوصيل</h2>
            <Link to='/order/me' className="py-3 px-7 mt-4 bg-slate-800 text-slate-100 font-tajawal active:scale-50 hover:underline hover:rounded-xl">عرض الاوردرات</Link>
        </div>
    </>
  )
}

export default Success