import React, { useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import ReactStars from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, getSingleProduct } from '../../actions/productAction'
import {Link, useParams} from 'react-router-dom'
import Loader from '../layout/Loader'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { Box, Breadcrumbs, Chip, Tab, Tabs, Typography } from '@mui/material'
import MetaData from '../layout/MetaData'
import { addToCart } from '../../actions/cartActions'

  const options = {
    thumbnailPosition: window.innerWidth > 640 ? "bottom" : "left",
    showPlayButton: false,
    useBrowserFullscreen: false,
    showFullscreenButton: false
  }

  const infos = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    isHalf: true,
    size: window.innerWidth < 600 ? 18 : 25,
  }

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)
    const handleQuantuty = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
        else {
            setQuantity(1)
        }
    }
    const handleIncreaseQuantuty = () => {
        if (quantity < 6) {
            setQuantity(quantity + 1)
        }
        else {
            setQuantity(6)
        }
    }

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const alert = useAlert()
    const params = useParams()
    
    const dispatch = useDispatch()
    const {loading, error, product} = useSelector(state => state.productDetails)

    const addToCartHamdler = () => {
        dispatch(addToCart(params.id, quantity))
        alert.success('Item Added Successfully')
    }
    
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        
        dispatch(getSingleProduct(params.id))
    }, [dispatch, error,alert, params])
    
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <MetaData title={product.name} />
                            <div className="container mx-auto mt-5 p-5 pb-0">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link style={{textDecoration: 'underline'}} color="inherit" to="/">
                                    Home
                                </Link>
                                <Link
                                style={{textDecoration: 'underline'}}
                                to="/products"
                                >
                                    Products
                                </Link>
                                <h2
                                    className="text-xl font-semibold text-slate-800"
                                >
                                    {product.name}
                                </h2>
                            </Breadcrumbs>
                            </div>
                            <div className="p-5 lg:w-4/5 mx-auto flex gap-4 sm:flex-row flex-col">
                                <div className="p-4 sm:w-4/5 w-[95%] flex-[0.45] sm:h-2/5 m-auto">
                                    {
                                        product && <ImageGallery items={(product?.images || []).map(i => {
                                            return {
                                                original: i.url,
                                                thumbnail: i.url,
                                            }}
                                        )}  {...options} />
                                    }
                                </div>
                                <div className="p-4 flex-[0.5] flex flex-col">
                                    <p className="text-sm text-slate-500">ProdutcId: {product._id}</p>
                                    <h2 className="text-3xl my-4 font-bold">{product.name}</h2>
                                    <div className="flex items-center gap-2 ">
                                        <ReactStars {...infos} value={product.ratings} /> <span className="font-semibold text-slate-500 text-sm">({product.numOfReviews}Review)</span>
                                    </div>
                                    <div className="text-slate-700 flex flex-col gap-4">
                                        <span>WHAT IS SPECIAL:</span>
                                        <ul className="list-disc mx-6 mb-4 " style={{direction: 'rtl'}}>
                                            {product && (product.info || '').split("،").map((d,i) => {
                                                return <li key={i}>{d}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-3 mb-4">
                                        <span className="text-slate-800 font-semibold">Category:</span>
                                        <span>
                                            <Chip label={product.category} color="warning" className='ml-5' />
                                        </span>
                                    </div>
                                    <div className='flex gap-3 items-center mb-3'>
                                        <div className='flex items-center gap-4 border border-gray-400 px-2 py-1 rounded-sm'>
                                            <button disabled={quantity === 1} className={`font-medium text-xl ${(quantity === 1) ? 'text-slate-500' : ''}`} onClick={handleQuantuty}>-</button>
                                            <span>{quantity}</span>
                                            <button disabled={quantity === 6} className={`font-medium text-xl ${(quantity === 6) ? 'text-slate-500' : ''}`} onClick={handleIncreaseQuantuty}>+</button>
                                        </div>
                                        <button onClick={addToCartHamdler} className="py-2 w-full border rounded-full font-medium hover:bg-slate-900 hover:text-slate-100 bg-amber-700 text-slate-100 transition active:scale-105">{`Add to Bag - ${(product.price * quantity)}$`}</button>
                                    </div>
                                    <p className="text-sm text-slate-500">Selled by: {product.seller}</p>
                                    <button className="py-3 mt-3 text-xl rounded w-full border font-medium bg-slate-900 text-slate-100 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-600 transition">Leave a review</button>
                                </div>
                            </div>
                            <div className="my-4 p-5">
                                <Box sx={{ border: 1, borderBottom: 0, borderColor: 'darkgray' }}>
                                    <Tabs value={value} textColor="secondary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Description" {...a11yProps(0)} sx={{background: '#f6f6f6', borderRight: 1,  borderColor: 'darkgray'}} />
                                        <Tab label="Reviews" {...a11yProps(1)} sx={{background: '#f6f6f6', borderRight: 1,  borderColor: 'darkgray'}} />
                                    </Tabs>
                                </Box>
                                <Box sx={{ border: 1, borderColor: 'darkgray' }}>
                                    <TabPanel value={value} index={0} style={{direction: 'rtl'}}>
                                        {product.description}
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        {
                                            product.reviews && product.reviews[0] ? (
                                                <div>
                                                    {
                                                        product.reviews && product.reviews.map(r => <div>
                                                            <p>{r.name}</p>
                                                            <ReactStars {...infos} value={r.rating} />
                                                            <span>{r.comment}</span>
                                                        </div> )
                                                    }
                                                </div>
                                            ) : (
                                                'There is no review yet, be the first one to fire this product'
                                            )
                                        }
                                    </TabPanel>
                                </Box>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default ProductDetails

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }