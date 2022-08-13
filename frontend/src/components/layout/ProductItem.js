import React from 'react'
import {Link} from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ProductItem = ({product, action}) => {
    let data = {product: product._id}
  return (
    <div  className="relative h-auto flex flex-col justify-between min-h-[260px] max-w-[250px] min-w-[160px] border rounded bg-white border-slate-200 hover:-translate-y-3 hover:shadow-card duration-300 ease-out transition">
        <div onClick={() => action(data)} className="z-10 absolute cursor-pointer text-red-600 bg-slate-50 sm:p-2 p-1 rounded-md shadow-sh sm:top-4 sm:right-4 top-2 right-2">
            <FavoriteBorderIcon className="active:scale-50" />
        </div>
        <div className='relative w-full h-full flex-auto flex justify-center items-center'>
            <Link to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} className="max-h-52 m-auto rounded" />
            </Link>
            {
                product?.discount > 0 ? <p className='absolute bottom-0 left-0 text-xs p-1 bg-red-700 text-white'>{`DISCOUNT ${product?.discount}%`}</p> : ''
            }
        </div>
        <div className=" p-2 border-t border-slate-300">
            <p className='text-sm text-slate-500'>{product.category}</p>
            <Link to={`/product/${product._id}`} className="text text-slate-800 sm:text-[16px] text-sm font-tajawal font-medium mb-1">{product.name}</Link>
            <div className='flex items-center justify-between'>
                {
                    product?.discount > 0 ? (
                        <p>
                            <span className="mr-2 font-semibold font-tajawal text-[16px] text-green-600">{product.price}EG</span>
                            <span className="line-through text-xs font-bold text-gray-600/70">{product.oldPrice}EG</span>
                        </p>
                    ) : (
                        <span className="font-semibold font-tajawal text-[16px] text-green-600">{product.price}EG</span>
                    )
                }
                {
                    product?.views > 0 ? <p className='text-xs text-slate-500'>({product?.views} views)</p> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default ProductItem