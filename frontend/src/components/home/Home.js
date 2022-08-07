import React, { useEffect } from 'react'
import ProductItem from '../layout/ProductItem'
import { clearErrors, getHome } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'
import { ADD_TO_FAV_RESET } from '../../constants/favConst'
import { addToFavourite, clearFavErrors } from '../../actions/favAction'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading, error, products} = useSelector(state => state.products)
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

    let cat = category && category.map((c, i) => (
        <div key={i} className=" w-[70px] min-w-[70px] h-12 text-ellipsis overflow-hidden">
            {c.name}
        </div>
    ))

    let hot = hotProducts && hotProducts.map((p) => {
        return <ProductItem key={p._id} product={p} action={handleAdding} />
    })

    let newest = newestProducts && newestProducts.map((p) => {
        return <ProductItem key={p._id} product={p} action={handleAdding} />
    })

    let top = topRatedProducts && topRatedProducts.map((p) => {
        return <ProductItem key={p._id} product={p} action={handleAdding} />
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
                                    cat
                                }
                            </div>
                            {/* hot products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-mainDarkColor p-4">Hot Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        hot
                                    }
                                </div>
                            </div>
                            {/* newest products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-mainDarkColor p-4">New Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        newest
                                    }
                                </div>
                            </div>
                            {/* top Rated products */}
                            <div className='mb-7'>
                                <h2 className="cp font-bold text-3xl text-mainDarkColor p-4">Top Rated</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                                    {
                                        top
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