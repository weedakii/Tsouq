import { 
    CARUSEL_FAIL,
    CARUSEL_REQUEST,
    CARUSEL_SUCCESS,
    UPDATE_CARUSEL_FAIL,
    UPDATE_CARUSEL_REQUEST,
    UPDATE_CARUSEL_SUCCESS,
    CARUSEL_DETAILS_REQUEST,
    CARUSEL_DETAILS_SUCCESS,
    CARUSEL_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/caruselConst"
import axios from "axios"

export const getCarusels = () => async (dispatch) => {
    try {
        dispatch({
            type: CARUSEL_REQUEST
        })
        let {data} = await axios.get('/api/v1/carusels')
        dispatch({
            type: CARUSEL_SUCCESS,
            payload: data.carusel
        })
    } catch (error) {
        dispatch({
            type: CARUSEL_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getSingleCarusel = (id) => async (dispatch) => {
    try {
        dispatch({type: CARUSEL_DETAILS_REQUEST})
        let {data} = await axios.get(`/api/v1/weed/carusel/${id}`)
        dispatch({
            type: CARUSEL_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CARUSEL_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const UpdateCarusel = (id, productData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_CARUSEL_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.put(
            `/api/v1/weed/carusel/${id}`,
            productData,
            config
        )
        dispatch({
            type: UPDATE_CARUSEL_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CARUSEL_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}