import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { myFavourite, removeFromFavourite } from '../../actions/favAction'
import { REMOVE_FROM_FAV_RESET } from '../../constants/favConst'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import FavCard from './FavCard'

const Favourite = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const {error, loading, items} = useSelector(state => state.myFav)
  const {error: errRemoved, idRemoved} = useSelector(state => state.removeFromFav)
  const handleRemove = (id) => {
      dispatch(removeFromFavourite(id))
  }
  useEffect(() => {
    const fetchData = () => {
      if(error) {
        alert.error(error)
      }
      if (errRemoved) {
        alert.error(errRemoved)
      }
      if (idRemoved) {
        alert.success("PRODUCT REMOVED SUCCESSFULY")
        dispatch({type: REMOVE_FROM_FAV_RESET})
      }
      dispatch(myFavourite())
    }
    fetchData()
  }, [error, alert, dispatch, idRemoved, errRemoved])
  
  return (
    <>
    <MetaData title={'Favourites'} />
      {
        loading ? (
          <Loader />
        ) : (
          <div className='h-full flex-1 sm:p-4 p-2'>
            {
              (items.length === 0) ? (
                <div className="text-center h-full py-3 my-auto">
                  <p className="p-3 bg-slate-200 text-orange-800 text-lg mb-4 w-fit mx-auto rounded-lg">there are no items yet</p>
                  <Link to='/' className="text-slate-800 font-semibold underline text-lg">Go Home And Add Some</Link>
                </div>
              ) : (
                <>
                <h2 className='w-fit border-b-4 border-slate-700 my-4 font-semibold sm:text-3xl text-xl mx-auto p-2 bg-slate-200'>Favorites Page</h2>
                <div className="mt-8 grid sm:grid-cols-pr grid-cols-2 gap-5 sm:p-5 mx-auto my-0 justify-center">
                  {
                    items && items.map(p => (
                      <FavCard key={p.product} card={p} action={handleRemove} />
                    ))
                  }
                </div>
                </>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default Favourite