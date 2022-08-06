import React, { useEffect } from 'react'
import ProductItem from '../layout/ProductItem'
import { clearErrors, getHome } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { REMOVE_FROM_FAV_RESET } from '../../constants/favConst'
import { addToFavourite } from '../../actions/favAction'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading, error, products} = useSelector(state => state.products)
    const {error: addErr, success} = useSelector(state => state.addToFav)
    const {error: rmvERR, idRemoved} = useSelector(state => state.removeFromFav)
    const {category} = useSelector(state => state.catygories)
    const {
        carousel,
        topRatedProducts,
        hotProducts,
        newestProducts
    } = products && products

    const handleAdding = (data) => {
        dispatch(addToFavourite(data))
    }

    useEffect(() => {
        const fetchData = () => {
            if (error) {
                alert.error(error)
                dispatch(clearErrors())
            }
            if (addErr) {
                alert.error(addErr)
                dispatch(clearErrors())
            }
            if (rmvERR) {
                alert.error(rmvERR)
                dispatch(clearErrors())
            }
            if (idRemoved) {
                alert.success('Product Removed Successfully')
                dispatch({type: REMOVE_FROM_FAV_RESET})
            }
            if (success) {
                alert.success('Product Added Successfully')
                dispatch({type: REMOVE_FROM_FAV_RESET})
            }
            dispatch(getHome())
        }
        fetchData()
    }, [dispatch, alert, error, addErr, rmvERR, success, idRemoved])
    
  return (
    <>
        {
            loading ? (
                <Loader />
            ) : (
                <>
                    <div className='h-full'>
                        <MetaData title='Tsouq' />
                        <div className="container mx-auto sm:p-5 p-2 overflow-hidden">
                            {/* banner */}
                            <div className="grid sm:grid-cols-3 sm:grid-rows-2 grid-rows-3 gap-4 h-[450px]">
                                <div className=" row-span-2 col-span-2">
                                    <img className='h-full w-full object-cover' src={carousel && carousel[0]?.url} alt={carousel && carousel[0]?.public_id} />
                                </div>
                                <div className="">
                                <img className='h-full w-full object-cover' src={carousel && carousel[1]?.url} alt={carousel && carousel[1]?.public_id} />
                                </div>
                                <div className="">
                                <img className='h-full w-full object-cover' src={carousel && carousel[2]?.url} alt={carousel && carousel[2]?.public_id} />
                                </div>
                            </div>
                            {/* category */}
                            <div className="my-7 mx-auto sm:w-fit flex justify-start gap-3 overflow-auto">
                                {
                                    category && category.map(c => (
                                        <div className=" w-[70px] min-w-[70px] h-12 text-ellipsis overflow-hidden">
                                            {c.name}
                                        </div>
                                    ))
                                }
                            </div>
                            {/* hot products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-slate-700 border-b-2 border-amber-500 p-4">Hot Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        hotProducts && hotProducts.map((p, i) => {
                                            return <ProductItem key={i} product={p} action={handleAdding} />
                                        })
                                    }
                                </div>
                            </div>
                            {/* newest products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-slate-700 border-b-2 border-amber-500 p-4">New Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        newestProducts && newestProducts.map((p, i) => {
                                            return <ProductItem key={i} product={p} action={handleAdding} />
                                        })
                                    }
                                </div>
                            </div>
                            {/* top Rated products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-slate-700 border-b-2 border-amber-500 p-4">Top Rated</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        topRatedProducts && topRatedProducts.map((p) => {
                                            return <ProductItem key={p._id} product={p} action={handleAdding} />
                                        })
                                    }
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