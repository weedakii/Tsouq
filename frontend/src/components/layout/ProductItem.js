import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import {Link} from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const options = {
    edit: false,
    color: 'rgba(20,20,20,0.1)',
    activeColor: 'tomato',
    isHalf: true,
    size: window.innerWidth < 600 ? 18 : 25,
}

const ProductItem = ({product}) => {
    const [fav, setFav] = useState(false)
    const handleFav = () => {
        setFav(!fav)
    }
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