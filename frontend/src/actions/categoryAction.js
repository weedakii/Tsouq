import { 
    CATEGORY_FAIL,
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CLEAR_ERRORS
} from "../constants/categoryConst"
import axios from "./axios"

export const getCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_REQUEST
        })
        let {data} = await axios.get('/api/v1/category')
        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data.category
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const createCategory = (productData) => async (dispatch) => {
    try {
        dispatch({type: CREATE_CATEGORY_REQUEST})
        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        const {data} = await axios.post(
            `/api/v1/weed/category/new`,
            productData,
            config
        )
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response.data?.errMessage || error.response.data?.message
        })
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_CATEGORY_REQUEST})
        let {data} = await axios.delete(`/api/v1/weed/category/${id}`)
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}