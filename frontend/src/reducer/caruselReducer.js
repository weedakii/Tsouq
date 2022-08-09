import { 
    CARUSEL_FAIL,
    CARUSEL_REQUEST,
    CARUSEL_SUCCESS,
    UPDATE_CARUSEL_FAIL,
    UPDATE_CARUSEL_REQUEST,
    UPDATE_CARUSEL_SUCCESS,
    UPDATE_CARUSEL_RESET,
    CARUSEL_DETAILS_REQUEST,
    CARUSEL_DETAILS_SUCCESS,
    CARUSEL_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/caruselConst"

export const caruselsReducer = (state= {carusel: []}, action) => {
    switch (action.type) {
        case CARUSEL_REQUEST:
            return {
                loading: true,
                carusel: []
            }
    
        case CARUSEL_SUCCESS:
            return {
                loading: false,
                carusel: action.payload,
            }
    
        case CARUSEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}

export const  caruselDetailsReducer = (state = {carusel: {}}, action) => {
    switch (action.type) {
        case CARUSEL_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case CARUSEL_DETAILS_SUCCESS:
            return {
                loading: false,
                carusel: action.payload.carusel,
            }
    
        case CARUSEL_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state
    }
}

export const updateCaruselReducer = (state= {carusel: {}}, action) => {
    switch (action.type) {
        case UPDATE_CARUSEL_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case UPDATE_CARUSEL_SUCCESS:
            return {
                loading: false,
                ...state,
                isUpdated: action.payload,
            }
    
        case UPDATE_CARUSEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case UPDATE_CARUSEL_RESET:
                return {
                    ...state,
                    isUpdated: false
                };
    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
    
        default:
            return state;
    }
}