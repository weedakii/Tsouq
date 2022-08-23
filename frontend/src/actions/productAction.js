import { 
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    HOME_REQUEST,
    HOME_SUCCESS,
    HOME_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConst"
import axios from './axios'

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCTS_REQUEST
        })
        let link = `/api/v1/weed/products`
        let {data} = await axios.get(link)
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getProducts = (keyword = '', currentPage = '', price = [0, 1000], cat, ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if (cat) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${cat}&ratings[gte]=${ratings}`
        }
        let {data} = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getHome = () => async (dispatch) => {
    try {
        dispatch({
            type: HOME_REQUEST
        })
        let link = `/api/v1/home`
        let {data} = await axios.get(link)
        dispatch({
            type: HOME_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HOME_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getSingleProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        let {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const UpdateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PRODUCT_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.put(
            `/api/v1/weed/product/${id}`,
            productData,
            config
        )
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({type: CREATE_PRODUCT_REQUEST})
        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        const {data} = await axios.post(
            `/api/v1/weed/product/new`,
            productData,
            config
        )
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data?.errMessage || error.response.data?.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_PRODUCT_REQUEST})
        let {data} = await axios.delete(`/api/v1/weed/product/${id}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}