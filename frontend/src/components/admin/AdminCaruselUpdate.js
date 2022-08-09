import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../layout/Loader'
import { UPDATE_CARUSEL_RESET } from '../../constants/caruselConst'
import { clearErrors, getSingleCarusel, UpdateCarusel } from '../../actions/caruselsAction'
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';

const AdminCaruselUpdate = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const [name, setName] = useState('')
    const [images, setImages] = useState('')
    const [oldImages, setOldImages] = useState('')
    const [imagesPreview, setImagesPreview] = useState('')
    const {error: errUpdate, loading: loadingUpdate, isUpdated} = useSelector(state => state.updateCarusel)
    const {error, loading, carusel} = useSelector(state => state.caruselDetails)

    const updateProductHundler = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.append("images", images)

        dispatch(UpdateCarusel(params.id, myForm))
    }

    const imagesHandler = (e) => {
      setImages('')
      setImagesPreview('')
      setOldImages('')
      const reader = new FileReader()
      reader.onload = () => {
          if (reader.readyState === 2) {
              setImages(reader.result)
              setImagesPreview(reader.result)
          }
      }
      reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        const fetchData = () => {
            if (window.innerWidth > 600 ) {
              setOpen(true)
            }
            if (carusel && carusel._id !== params.id) {
                dispatch(getSingleCarusel(params.id))
            } else {
                setName(carusel.public_id)
                setOldImages(carusel?.url)
                
            }
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            if (errUpdate) {
                alert.error(errUpdate)
                dispatch(clearErrors())
            }
            if (isUpdated) {
                alert.success("Carusel Updated Successfully")
                navigate('/admin/carusels')
                dispatch({type: UPDATE_CARUSEL_RESET})
            }
        }
        fetchData()
    }, [error, errUpdate, alert, dispatch, navigate, isUpdated, carusel, params])
    
  return (
    <>
        <MetaData title="Admin Products"/>
        {
          loading ? (
            <Loader />
          ) : (
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
                      onSubmit={updateProductHundler}
                  >
                      <h3 className='text-slate-800 mb-5 text-center text-2xl font-bold'>Update Product</h3>
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
                              disabled
                          />
                      </div>
                      <div className='mb-4'>
                          <input 
                              type="file" 
                              name='avatar'
                              accept='image/*'
                              onChange={imagesHandler}
                              className='inp_file w-full'
                          />
                      </div>
                      <div className='mb-4 p-2 flex justify-start overflow-auto max-h-48'>
                          {
                              oldImages && <img src={oldImages} alt="Carusel alt" className='mx-3' width="150" />
                          }
                      </div>
                      <div className='mb-4 p-2 flex justify-start overflow-auto max-h-48'>
                          {
                            imagesPreview && <img src={imagesPreview} alt="Carusel alt Preview" className='mx-3' width="150" />
                          }
                      </div>
                      <Button type='submit' variant='contained' color='warning' disabled={loadingUpdate ? true : false}>
                          Update
                      </Button>
                  </form>
              </div>
          </div>
          )
        }
    </>
  )
}

export default AdminCaruselUpdate