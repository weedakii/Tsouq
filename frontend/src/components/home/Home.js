import React, { useEffect } from 'react'
import ProductItem from '../layout/ProductItem'
import { clearErrors, getHome } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { ADD_TO_FAV_RESET } from '../../constants/favConst'
import { addToFavourite } from '../../actions/favAction'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router-dom'
import CatCard from '../layout/CatCard'

// import "./styles.css";

const Home = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading, error, products} = useSelector(state => state.home)
    const {category} = useSelector(state => state.catygories)
    const {
        carousel,
        topRatedProducts,
        hotProducts,
        newestProducts
    } = products && products

    const handleAdding = async (data) => {
        dispatch(addToFavourite(data))
        alert.success('Product Added Successfully')
        dispatch({type: ADD_TO_FAV_RESET})
    }

    let cat = category && category.map((c) => (
        <SwiperSlide><Link to={`/products?cat=${c.name}`} key={c.name}>
            <CatCard name={c.name} image={c.image_url} />
        </Link></SwiperSlide>
    ))

    let hot = hotProducts && hotProducts.map((p) => {
        return <SwiperSlide><ProductItem key={p._id} product={p} action={handleAdding} /></SwiperSlide>
    })

    let newest = newestProducts && newestProducts.map((p) => {
        return <SwiperSlide><ProductItem key={p._id} product={p} action={handleAdding} /></SwiperSlide>
    })

    let top = topRatedProducts && topRatedProducts.map((p) => {
        return <SwiperSlide><ProductItem key={p._id} product={p} action={handleAdding} /></SwiperSlide>
    })

    useEffect(() => {
        const fetchData = () => {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            dispatch(getHome())
        }
        fetchData()
    }, [error, alert, dispatch])
    
  return (
    <>
        {
            loading ? (
                <Loader />
            ) : (
                <>
                    <div dir='rtl' className='h-full'>
                        <MetaData title='Tsouq' />
                        <div className="container mx-auto sm:p-5 p-2 overflow-hidden">
                            {/* banner */}
                            <div className="max-h-[500px]">
                                <Swiper
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className=" h-full w-full row-span-2 col-span-2">
                                            <img className='h-full w-full rounded-lg object-cover m-auto' src={carousel && carousel[0]?.url} alt={carousel && carousel[0]?.public_id} />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-full w-full">
                                            <img className='h-full w-full rounded-lg object-cover m-auto' src={carousel && carousel[1]?.url} alt={carousel && carousel[1]?.public_id} />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="h-full w-full">
                                            <img className='h-full w-full rounded-lg object-cover m-auto' src={carousel && carousel[2]?.url} alt={carousel && carousel[2]?.public_id} />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            {/* category */}
                            <div className='my-7 overflow-hidden'>
                                <h2 className='cp mb-5 font-bold text-3xl text-mainDarkColor p-4'>الاقسام</h2>
                                <div className="relative sm:p-6 mx-auto flex justify-start gap-3 overflow-auto">
                                    <Swiper
                                        slidesPerView={window.innerWidth < 600 ? 3 : window.innerWidth > 900 ? 6 : 4}
                                        spaceBetween={20}
                                        slidesPerGroup={1}
                                        loopFillGroupWithBlank={true}
                                        className="mySwiper items-center"
                                        style={{"--swiper-navigation-color": "#FFF"}}
                                    >
                                        {cat}
                                    </Swiper>
                                    <div className='absolute top-0 left-0 h-full z-10 w-[70px] mr-auto shadow-[inset_51px_-2px_29px_-31px_#00000095]'></div>
                                </div>
                            </div>
                            {/* hot products */}
                            <div className='mb-7 overflow-hidden'>
                                <h2 className="cp mb-5 font-bold text-3xl text-mainDarkColor p-4">المنتجات الرائجة</h2>
                                {/* <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        hot
                                    }
                                </div> */}
                                <div className='sm:m-5 mx-0'>
                                    <Swiper
                                        dir='ltr'
                                        slidesPerView={window.innerWidth < 600 ? 2 : window.innerWidth > 900 ? 4 : 3}
                                        spaceBetween={20}
                                        slidesPerGroup={1}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                        clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper items-center"
                                        style={{"--swiper-navigation-color": "#FFF"}}
                                    >
                                        {hot}
                                    </Swiper>
                                </div>
                            </div>
                            {/* newest products */}
                            <div className='mb-7 overflow-hidden'>
                                <h2 className="cp font-bold text-3xl text-mainDarkColor p-4 mb-5">الجديد عندنا</h2>
                                <div className='sm:m-5 mx-0'>
                                    <Swiper
                                        dir='ltr'
                                        slidesPerView={window.innerWidth < 600 ? 2 : window.innerWidth > 900 ? 4 : 3}
                                        spaceBetween={20}
                                        slidesPerGroup={1}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                        clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper items-center"
                                        style={{"--swiper-navigation-color": "#ddd"}}
                                    >
                                        {newest}
                                    </Swiper>
                                </div>
                            </div>
                            {/* top Rated products */}
                            <div className='mb-7 overflow-hidden'>
                                <h2 className="cp mb-5 font-bold text-3xl text-mainDarkColor p-4">الاعلي تقيما</h2>
                                <div className='sm:m-5 mx-0'>
                                    <Swiper
                                        dir='ltr'
                                        slidesPerView={window.innerWidth < 600 ? 2 : window.innerWidth > 900 ? 4 : 3}
                                        spaceBetween={20}
                                        slidesPerGroup={1}
                                        loopFillGroupWithBlank={true}
                                        pagination={{
                                        clickable: true,
                                        }}
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper items-center"
                                        style={{"--swiper-navigation-color": "#FFF"}}
                                    >
                                        {top}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    </>
  )
}

export default Home