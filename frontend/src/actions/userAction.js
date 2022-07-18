import { 
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from "../constants/userConst"
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/login`,
            {email, password},
            config
        )
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST})
        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        const {data} = await axios.put(
            `/api/v1/me/update`,
            userData,
            {config}
        )
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.put(
            `/api/v1/password/update`,
            passwords,
            {config}
        )
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST})
        const config = {
            headers: {"Content-Type": "application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        )
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_REQUEST})
        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        const {data} = await axios.post(
            `/api/v1/register`,
            userData,
            {config}
        )
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST})
        const {data} = await axios.get('/api/v1/me')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            error: error.response.data.errMessage
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}