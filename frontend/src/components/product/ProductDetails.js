import React, { useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReactStars from 'react-rating-stars-component'
import {useDispatch, useSelector} from 'react-redux'
import { clearErrors, getSingleProduct } from '../../actions/productAction'
import {Link, useParams} from 'react-router-dom'
import Loader from '../layout/Loader'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { Box, Breadcrumbs, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs } from '@mui/material'
import MetaData from '../layout/MetaData'
import { addToCart } from '../../actions/cartActions'
import ProductItem from '../layout/ProductItem'
import { addToFavourite } from '../../actions/favAction';
import { ADD_TO_FAV_RESET } from '../../constants/favConst';

  const options = {
    thumbnailPosition: window.innerWidth > 640 ? "bottom" : "top",
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
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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
    const {loading, error, product, filtered} = useSelector(state => state.productDetails)
    const {isAuthenticated} = useSelector(state => state.user)

    const addToCartHamdler = () => {
        dispatch(addToCart(params.id, quantity))
        alert.success('Item Added Successfully')
    }

    const handleAdding = async (data) => {
        if (isAuthenticated) {
            dispatch(addToFavourite(data))
            alert.success('Product Added Successfully')
            dispatch({type: ADD_TO_FAV_RESET})
        } else {
            alert.info('Login first to access this feature')
        }
    }
    
    let prod = filtered && filtered.map(p => {
        return <ProductItem key={p._id} product={p} action={handleAdding} />
    })

    const revs = product.reviews && product.reviews.map(r => <div>
        <p>{r.name}</p>
        <ReactStars {...infos} value={r.rating} />
        <span>{r.comment}</span>
    </div> )

    useEffect(() => {
        let fetchData = () => {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            
            dispatch(getSingleProduct(params.id))
        }
        fetchData()
    }, [dispatch, error, alert, params.id])
    
    return (
        <>
            {
                (loading) ? (
                    <Loader />
                ) : (
                    <>
                        <div>
                            <MetaData title={`${product.name} - تسوق`} />
                            <div className="container mx-auto mt-5 p-5 pb-0">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link className='sm:text-base text-sm' style={{textDecoration: 'underline'}} color="inherit" to="/">
                                    Home
                                </Link>
                                <Link
                                    className='sm:text-base text-sm'
                                    style={{textDecoration: 'underline'}}
                                    to="/products"
                                >
                                    Products
                                </Link>
                                <h2
                                    className="sm:text-xl text-xs font-serif font-semibold text-slate-800"
                                >
                                    {product.name}
                                </h2>
                            </Breadcrumbs>
                            </div>
                            <div className="p-5 mx-auto flex gap-4 sm:flex-row flex-col">
                                <div className="p-4 md:w-3/5 sm:w-[50%] w-[90%] flex-[0.38] sm:h-2/5 m-auto">
                                    {
                                        product && product.images && <ImageGallery items={(product?.images || []).map(i => {
                                            return {
                                                thumbnail: i.url,
                                                original: i?.url,
                                            }}
                                        )}  {...options} />
                                    }
                                </div>
                                <div dir='rtl' className="p-4 flex-[0.62] flex flex-col">
                                    <p className="text-sm text-end text-slate-500">ProdutcId: {product._id}</p>
                                    <h2 className="text-3xl my-4 font-bold">{product.name}</h2>
                                    {/* <div className="flex items-center gap-2 ">
                                        <ReactStars {...infos} value={product.ratings} /> <span className="font-semibold text-slate-500 text-sm">({product.numOfReviews}Review)</span>
                                    </div> */}
                                    <div className="text-slate-700 flex flex-col gap-4">
                                        <span>المميزات:</span>
                                        <ul className="list-disc mx-6 mb-4 " style={{direction: 'rtl'}}>
                                            {product && (product.info || '').split("،").map((d,i) => {
                                                return <li key={i}>{d}</li>
                                            })}
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-3 mb-4">
                                        <span className="text-slate-800 font-semibold">القسم:</span>
                                        <span>
                                            <Chip label={product.category} color="success" className='ml-5' />
                                        </span>
                                    </div>
                                    <div className='flex gap-3 items-center mb-3'>
                                        <div className='flex items-center gap-4 border border-gray-400 px-2 py-1 rounded-sm'>
                                            <button disabled={quantity === 1} className={`font-medium text-xl ${(quantity === 1) ? 'text-slate-500' : ''}`} onClick={handleQuantuty}>-</button>
                                            <span>{quantity}</span>
                                            <button disabled={quantity === 6} className={`font-medium text-xl ${(quantity === 6) ? 'text-slate-500' : ''}`} onClick={handleIncreaseQuantuty}>+</button>
                                        </div>
                                        <button onClick={addToCartHamdler} className="py-2 w-full border rounded-full font-medium hover:bg-slate-900 hover:text-slate-100 bg-amber-700 text-slate-100 transition active:scale-105">{`اضف الي العربة - ${(product.price * quantity)} جنيه`}</button>
                                    </div>
                                    <p className="text-sm text-slate-500">المالك: {product.seller}</p>
                                    <button onClick={handleClickOpen} className="py-3 mt-3 text-xl rounded w-full border font-medium bg-slate-900 text-slate-100 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-600 transition">Leave a review</button>
                                    <div>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                            {"We Are Very Sorry!!!"}
                                            </DialogTitle>
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                            <span className='flex items-center rounded-xl shadow-card p-5 gap-3 text-slate-50 bg-[#d32f2f]'>
                                                <ErrorOutlineIcon color='inherit' />
                                                <span className='text-cm'>This future will be available soon</span>
                                            </span>
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} autoFocus>
                                                    Close
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                            <div dir='rtl' className="my-4 p-5">
                                <Box sx={{ border: 1, borderBottom: 0, borderColor: 'darkgray' }}>
                                    <Tabs value={value} textColor="secondary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="الوصف" {...a11yProps(0)} sx={{background: '#f6f6f6', borderLeft: 1, fontSize: '20px',  borderColor: 'darkgray'}} />
                                        <Tab label="التعليقات" {...a11yProps(1)} sx={{background: '#f6f6f6', borderLeft: 1, fontSize: '20px',  borderColor: 'darkgray'}} />
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
                                                        revs
                                                    }
                                                </div>
                                            ) : (
                                                'There is no review yet, be the first one to fire this product'
                                            )
                                        }
                                    </TabPanel>
                                </Box>
                            </div>
                            <div dir='rtl'>
                                <h3 className='text-slate-800 sm:text-2xl ml-4 mb-4 p-3 text-lg font-semibold'>منتجات مشابهة</h3>
                                    
                                <div className='flex items-center flex-nowrap overflow-auto gap-3 p-3 sm:mx-6'>
                                    {
                                        prod
                                    }
                                </div>
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
            <p className='font-tajawal'>{children}</p>
        </Box>
    )}
    </div>
);
}