import React, { useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myFavourite, removeFromFavourite } from '../../actions/favAction'
import { REMOVE_FROM_FAV_RESET } from '../../constants/favConst'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import FavCard from './FavCard'

const Favourite = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const {error, loading, items} = useSelector(state => state.myFav)
  const {error: errRemoved, idRemoved, message} = useSelector(state => state.removeFromFav)
  const handleRemove = (id) => {
      dispatch(removeFromFavourite(id))
  }
  useEffect(() => {
    if(error) {
      alert.error(error)
    }
    if (errRemoved) {
      alert.error(errRemoved)
  }
  if (idRemoved) {
      alert.success(message)
      dispatch({type: REMOVE_FROM_FAV_RESET})
  }

    dispatch(myFavourite())
  }, [error, alert, dispatch, idRemoved, message, errRemoved])
  
  return (
    <>
    <MetaData title={'Favourites'} />
      {
        loading ? (
          <Loader />
        ) : (
          <div className='h-full flex-1 sm:p-4 p-2'>
            <h2 className='w-fit border-b-4 border-slate-700 my-4 font-semibold sm:text-3xl text-xl mx-auto p-2 bg-slate-200'>Favorites Page</h2>
            <div>
              {
                items && items.map(p => (
                  <FavCard key={p.product} card={p} action={handleRemove} />
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default Favourite