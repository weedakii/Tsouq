import React, { useEffect } from 'react'
import ProductItem from '../layout/ProductItem'
import { clearErrors, getProducts } from '../../actions/productAction'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import {useAlert} from 'react-alert'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const {loading, error, products} = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProducts())
    }, [dispatch, alert, error])
    
  return (
    <>
        {
            loading ? (
                <Loader />
            ) : (
                <>
                    <div>
                        <MetaData title='Tsouq' />
                        <div className="container mx-auto p-5 overflow-hidden">
                            {/* banner */}
                            <div className="grid sm:grid-cols-3 sm:grid-rows-2 grid-rows-3 gap-4 h-[450px]">
                                <div className="bg-stone-600 row-span-2 col-span-2">img1</div>
                                <div className="bg-stone-600">img2</div>
                                <div className="bg-stone-600">img3</div>
                            </div>
                            {/* category */}
                            <div className="my-7 flex justify-center gap-2 overflow-auto">
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                                <div className="bg-amber-800 w-12 min-w-[48px] h-12">cat</div>
                            </div>
                            {/* hot products */}
                            <div>
                                <h2 className="cp font-bold text-3xl text-slate-700 border-b-2 border-amber-500 p-4">Hot Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 p-5 mx-auto my-0 justify-center">
                                    {
                                        products && products.map((p, i) => {
                                            return <ProductItem key={i} product={p} />
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