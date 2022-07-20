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
    const {category} = useSelector(state => state.catygories)

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
                    <div className='h-full'>
                        <MetaData title='Tsouq' />
                        <div className="container mx-auto sm:p-5 p-2 overflow-hidden">
                            {/* banner */}
                            <div className="grid sm:grid-cols-3 sm:grid-rows-2 grid-rows-3 gap-4 h-[450px]">
                                <div className="bg-stone-600 row-span-2 col-span-2">img1</div>
                                <div className="bg-stone-600">img2</div>
                                <div className="bg-stone-600">img3</div>
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
                            <div>
                                <h2 className="cp font-bold text-3xl text-slate-700 border-b-2 border-amber-500 p-4">Hot Products</h2>
                                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
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