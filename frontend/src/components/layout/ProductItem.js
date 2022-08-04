import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToFavourite, removeFromFavourite } from '../../actions/favAction';
import { ADD_TO_FAV_RESET, REMOVE_FROM_FAV_RESET } from '../../constants/favConst'

const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    isHalf: true,
    size: window.innerWidth < 600 ? 18 : 25,
}

const ProductItem = ({product}) => {
    const favData = product && {
        name: product?.name,
        price: product?.price,
        ratings: product?.ratings,
        product: product?._id,
        image: product?.images[0].url,
    }
    const alert = useAlert()
    const dispatch = useDispatch()
    const {error, success} = useSelector(state => state.addToFav)
    const {error: errRemove, idRemoved, message} = useSelector(state => state.removeFromFav)
    const {isAuthenticated} = useSelector(state => state.user)
    const [fav, setFav] = useState(false)
    const handleFav = () => {
        if (!isAuthenticated) {
            return alert.error("Login First To Use Fav Feautures")
        }
        if (fav === false) {
            dispatch(addToFavourite(favData))
        }
        if (fav === true) {
            dispatch(removeFromFavourite(product?._id))
        }
        setFav(!fav)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        if (errRemove) {
            alert.error(errRemove)
        }
        if (success) {
            dispatch({type: ADD_TO_FAV_RESET})
        }
        if (idRemoved) {
            alert.success(message)
            dispatch({type: REMOVE_FROM_FAV_RESET})
        }
    }, [error, alert, success, dispatch, errRemove, idRemoved, message])
    
  return (
    <div  className="relative flex flex-col justify-between min-h-[260px] max-w-[250px] min-w-[160px] border rounded bg-white border-slate-200 hover:-translate-y-3 hover:shadow-card duration-300 ease-out transition">
        <div onClick={handleFav} className="absolute cursor-pointer text-red-600 bg-slate-50 sm:p-2 p-1 rounded-md shadow-sh sm:top-4 sm:right-4 top-2 right-2">
            {
                fav ? <FavoriteIcon className="active:scale-50" /> : <FavoriteBorderIcon className="active:scale-50" />
            }
        </div>
        <img src={product.images[0].url} alt={product.name} className="max-h-52 m-auto rounded" />
        <div className=" p-2 border-t border-slate-300">
            <Link to={`/product/${product._id}`} className="text underline sm:text-lg text-base font-serif font-bold">{product.name}</Link>
            <div className="flex items-center gap-2 ">
                <ReactStars {...options} value={product.ratings} /> <span className="font-medium text-sm">({product.numOfReviews}R)</span>
            </div>
            <span className="font-semibold text-orange-700">{product.price}$</span>
        </div>
    </div>
  )
}

export default ProductItem