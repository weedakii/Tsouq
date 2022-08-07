import { 
    ADD_TO_FAV_FAIL,
    ADD_TO_FAV_REQUEST,
    ADD_TO_FAV_SUCCESS,
    REMOVE_FROM_FAV_FAIL,
    REMOVE_FROM_FAV_REQUEST,
    REMOVE_FROM_FAV_SUCCESS,
    MY_FAV_FAIL,
    MY_FAV_REQUEST,
    MY_FAV_SUCCESS,
    CLEAR_ERRORS
} from "../constants/favConst";
import axios from 'axios'


export const myFavourite = () => async (dispatch) => {
    try {
        dispatch({type: MY_FAV_REQUEST})
        const {data} = await axios.get(
            `/api/v1/favourite`,
        )
        dispatch({
            type: MY_FAV_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_FAV_FAIL,
            payload: error.response.data.errMessage || error.response.data.message
        })
    }
}

export const addToFavourite = (productData) => async (dispatch) => {
    try {
        dispatch({type: ADD_TO_FAV_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/favourite/new`,
            productData,
            config
        )
        dispatch({
            type: ADD_TO_FAV_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADD_TO_FAV_FAIL,
            payload: error.response.data.errMessage || error.response.data.message
        })
    }
}

export const removeFromFavourite = (productData) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_FROM_FAV_REQUEST})
        const {data} = await axios.delete(
            `/api/v1/favourite/${productData}`,
        )
        dispatch({
            type: REMOVE_FROM_FAV_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_FAV_FAIL,
            payload: error.response.data.errMessage || error.response.data.message
        })
    }
}

export const clearFavErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}