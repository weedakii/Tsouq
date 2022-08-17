import axios from './axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConst'

export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({type: CREATE_ORDER_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        let {data} = await axios.post(
            `/api/v1/order/new`,
            orderData,
            config
            )
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_ORDER_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        let {data} = await axios.put(
            `/api/v1/weed/order/${id}`,
            orderData,
            config
            )
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_ORDER_REQUEST})
        let {data} = await axios.delete(
            `/api/v1/weed/order/${id}`
            )
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try {
        dispatch({type: ALL_ORDER_REQUEST})

        let {data} = await axios.get('/api/v1/weed/orders')
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDER_REQUEST})

        let {data} = await axios.get('/api/v1/orders/me')
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST})
        let {data} = await axios.get(
            `/api/v1/order/${id}`,
            )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}