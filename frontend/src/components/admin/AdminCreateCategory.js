import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import { clearErrors, createCategory } from '../../actions/categoryAction'
import { CREATE_CATEGORY_RESET } from '../../constants/categoryConst'


const AdminCreateCategory = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [name, setName] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')
    const [images, setImages] = useState('')

    const {error, loading, success} = useSelector(state => state.createCategory)

    const createProductHundler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.append("name", name)
        myForm.append("categoryImage", images)

        dispatch(createCategory(myForm))

        setName('')
        setImages('')
        setImagesPreview('')
    }

    const imagesHandler = (e) => {
        let file = e.target.files[0]
        setImages(file)
        setImagesPreview('')

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
            setImagesPreview(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        const fetchData = () => {
            if (window.innerWidth > 600 ) {
                setOpen(true)
            }
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            if (success) {
                alert.success("Product Created Successfully")
                navigate('/admin/category/new')
                dispatch({type: CREATE_CATEGORY_RESET})
            }
        }
        fetchData()
    }, [error, alert, dispatch, navigate, success])

  return (
    <>
        <MetaData title="الادمن - انشاء قسم"/>
        <div className="flex-1 sm:grid-cols-sid grid-cols-1 grid sm:p-3 p-2 w-screen max-w-[100%]">
            <div className="relative sm:max-w-[250px] sm:min-w-[200px] z-10 bg-white">
                <div className='sm:hidden'>
                    <Button onClick={handleOpen} >
                    {
                        open ? <CloseIcon fontSize='large' color='error' /> 
                        : <SortIcon fontSize='large' color='info' />
                    }
                    </Button>

                </div>
                <div className={`${open ? 'block' : 'hidden'}`}>
                    <Sidebar />
                </div>
            </div>
            <div className='p-5'>
                <form 
                    dir='rtl'
                    className='flex flex-col font-tajawal'
                    encType='multipart/form-data'
                    onSubmit={createProductHundler}
                >
                    <h3 className='text-slate-800 mb-5 text-center text-2xl font-bold'>انشاء منتج قسم</h3>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <SpellcheckIcon />
                        <input 
                            type="text"
                            value={name}
                            name="name"
                            className='inp shipping_inp w-full'
                            placeholder='اسم القسم'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <input 
                            type="file" 
                            name='categoryImage'
                            accept='image/*'
                            multiple
                            onChange={imagesHandler}
                            className='inp_file w-full'
                        />
                    </div>
                    <div className='mb-4 flex overflow-auto max-h-48'>
                        {
                            imagesPreview && <img src={imagesPreview} alt="category Preview" className='mx-3' width="150" />
                        }
                    </div>
                    <Button type='submit' variant='contained' color='warning' disabled={loading ? true : false}>
                        انشاء
                    </Button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AdminCreateCategory