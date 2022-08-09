import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FeedIcon from '@mui/icons-material/Feed';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CREATE_PRODUCT_RESET } from '../../constants/productConst'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

const AdminProductCreate = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [info, setInfo] = useState('')
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [cat, setCat] = useState('')
    const [imagesPreview, setImagesPreview] = useState([])
    const [images, setImages] = useState([])
    const {error, loading, success} = useSelector(state => state.createProduct)
    const {category} = useSelector(state => state.catygories)

    const createProductHundler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("price", price)
        myForm.set("description", description)
        myForm.set("info", info)
        myForm.set("stock", stock)
        myForm.set("category", cat)

        images.forEach(i => {
            myForm.append("images", i)
        })

        dispatch(createProduct(myForm))
    }

    const imagesHandler = (e) => {
        let files = Array.from(e.target.files)
        setImages([])
        setImagesPreview([])

        files.forEach(f => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result])
                    setImagesPreview((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(f)
        })
    }

    const catyg = category && category.map(c => (
        <option value={c.name} key={c._id}>
            {c.name}
        </option>
    ))

    useEffect(() => {
        const fetchData = () => {
            if (window.innerWidth > 600 ) {
                setOpen(true)
            }
            if (error) {
                alert.error(error)
                dispatch(clearErrors)
            }
            if (success) {
                alert.success("Product Created Successfully")
                navigate('/admin/products')
                dispatch({type: CREATE_PRODUCT_RESET})
            }
        }
        fetchData()
    }, [error, alert, dispatch, navigate, success])
    
  return (
    <>
        <MetaData title="Admin Products"/>
        <div className="sm:grid-cols-sid grid-cols-1 grid sm:p-3 p-2 w-screen max-w-[100%]">
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
                    className='flex flex-col'
                    encType='multipart/form-data'
                    onSubmit={createProductHundler}
                >
                    <h3 className='text-slate-800 mb-5 text-center text-2xl font-bold'>Create Product</h3>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <SpellcheckIcon />
                        <input 
                            type="text"
                            value={name}
                            name="name"
                            className='inp shipping_inp w-full'
                            placeholder='Product Name'
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <AttachMoneyIcon />
                        <input 
                            type="number"
                            className='inp shipping_inp w-full'
                            placeholder='Price'
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <AttachMoneyIcon />
                        <input 
                            type="number"
                            className='inp shipping_inp w-full'
                            placeholder='Stock'
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <DescriptionIcon />
                        <textarea 
                            placeholder='Description'
                            className='inp shipping_inp w-full'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            cols="30"
                            rows="2"
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <FeedIcon />
                        <textarea 
                            placeholder='Information'
                            className='inp shipping_inp w-full'
                            required
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            cols="30"
                            rows="2"
                        />
                    </div>
                    <div className='flex items-center gap-3 mb-4 text-slate-600'>
                        <AccountTreeIcon />
                        <select className='inp shipping_inp w-full' onChange={(e) => setCat(e.target.value)}>
                            <option value="" disabled>Choose Category</option>
                            {
                                catyg
                            }
                        </select>
                    </div>
                    <div className='mb-4'>
                        <input 
                            type="file" 
                            name='avatar'
                            accept='image/*'
                            multiple
                            onChange={imagesHandler}
                            className='inp_file w-full'
                        />
                    </div>
                    <div className='mb-4 flex overflow-auto max-h-48'>
                        {
                            imagesPreview.map((e, i) => (
                                <img src={e} key={i} alt="Avatar Preview" className='mx-3' width="150" />
                            ))
                        }
                    </div>
                    <Button type='submit' variant='contained' color='warning' disabled={loading ? true : false}>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AdminProductCreate