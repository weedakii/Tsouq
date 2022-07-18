import { Breadcrumbs, Slider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { clearErrors, getCategory, getProducts } from '../../actions/productAction'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ProductItem from '../layout/ProductItem'
import Search from './Search'
import ReactStars from 'react-rating-stars-component'

const options = {
    edit: true,
    color: 'rgba(20,20,20,0.4)',
    activeColor: 'tomato',
    isHalf: true,
    size: window.innerWidth < 600 ? 18 : 25,
}

const AllProducts = () => {
    const params = useParams()
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error, loading, products, productsCount, resPerPage, filteredProducts} = useSelector(state => state.products)
    const {category} = useSelector(state => state.catygories)
    const keyword = params.keyword
    let count = filteredProducts
    
    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const [price, setPrice] = useState([0, 1000])
    const [newPrice, setNewPrice] = useState([0, 1000])
    const handlePrice = (e, newPrice) => {
        setPrice(newPrice)
    }

    const [cat, setCat] = useState('')
    const [ratings, setRatings] = useState(0)
    

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getProducts(keyword, currentPage, newPrice, cat, ratings))
        dispatch(getCategory())
    }, [dispatch, error, alert, keyword, currentPage, newPrice, cat, ratings])
    
    return (
    <>
        {
            loading ? (
                <Loader />
            ) : (
                <div>
                    <MetaData title={'Tsouq - all products'} />
                    <div className="container mx-auto my-5 p-5 pb-0">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link style={{textDecoration: 'underline'}} color="inherit" to="/">
                                Home
                            </Link>
                            <h2
                                className="text-xl font-semibold text-slate-800"
                            >
                                Products
                            </h2>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <div className="bg-slate-100 px-8 mx-auto py-5 sticky top-0 z-20">
                            <Search />
                        </div>
                        <div className="flex border-t border-slate-500">
                            <div className="w-1/5 border-r border-slate-600">
                                <h2>Filter</h2>
                                <div className="p-1">
                                    <div className="pb-3 flex flex-col border-slate-500 border-b">
                                        <h2 className="mb-10 font-semibold text-xl flex justify-center">Price:
                                        <button 
                                            onClick={() => setNewPrice(price)}
                                            className="py-1 px-3 text-sm ml-auto border-2 border-orange-700 hover:bg-red-600 hover:text-slate-100"
                                        >Filter</button>
                                        </h2>
                                        <Slider
                                            getAriaLabel={() => 'Temperature range'}
                                            value={price}
                                            onChange={handlePrice}
                                            valueLabelDisplay="on"
                                            min={0}
                                            max={1000}
                                            step={100}
                                            sx={{width: '80%', margin: '0 auto'}}
                                        />
                                    </div>
                                    <div className="border-slate-500 border-b pb-3">
                                        <h2 className="text-xl font-semibold">Category</h2>
                                        <ul className="p-3 list-none font-mono cursor-pointer">
                                            <li onClick={() => setCat('')}
                                                className="hover:text-red-700 hover:pl-2"
                                            >All Products</li>
                                            {
                                                category && category.map(c => (
                                                    <li 
                                                        className="hover:text-red-700 hover:pl-3 transition"
                                                        key={c._id}
                                                        onClick={() => setCat(c.name)}
                                                    >&rarr; {c.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <fieldset className="border border-slate-400 pb-1 flex justify-center">
                                        <legend className="ml-2 px-2 py-0">Ratings</legend>
                                        <ReactStars 
                                            {...options}
                                            value={ratings}
                                            onChange={(newRating) => {
                                                setRatings(newRating);
                                            }}
                                        />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="w-4/5 grid sm:grid-cols-pr grid-cols-2 sm:gap-5 gap-3 p-4 mx-auto my-0 justify-center">
                                {
                                    products && products.map(product => (
                                        <ProductItem key={product._id} product={product} />
                                    ))
                                }
                            </div>
                        </div>
                        {
                            resPerPage < count && (
                            <div className="flex justify-center m-5">
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    activeClass='pageItemActive'
                                    activeLinkClass='pageLinkActive'
                                />
                            </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    </>
  )
}

export default AllProducts