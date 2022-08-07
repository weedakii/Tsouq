import { 
    ADD_TO_FAV_FAIL,
    ADD_TO_FAV_REQUEST,
    ADD_TO_FAV_RESET,
    ADD_TO_FAV_SUCCESS,
    REMOVE_FROM_FAV_FAIL,
    REMOVE_FROM_FAV_REQUEST,
    REMOVE_FROM_FAV_RESET,
    REMOVE_FROM_FAV_SUCCESS,
    MY_FAV_FAIL,
    MY_FAV_REQUEST,
    MY_FAV_SUCCESS,
    CLEAR_ERRORS
} from "../constants/favConst";


export const myFavReducer = (state= {items: []}, action) => {
    switch (action.type) {
        case MY_FAV_REQUEST:
            return {
                loading: true,
                items: []
            }
    
        case MY_FAV_SUCCESS:
            return {
                loading: false,
                items: action.payload.favourites,
            }
    
        case MY_FAV_FAIL:
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

export const addToFavReducer = (state= {item: {}}, action) => {
    switch (action.type) {
        case ADD_TO_FAV_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case ADD_TO_FAV_SUCCESS:
            return {
                loading: false,
                item: action.payload.favourite,
                success: action.payload.success,
            }
    
        case ADD_TO_FAV_FAIL:
            return {
                ...state,
                loading: false,
                errorFav: action.payload
            }
    
        case ADD_TO_FAV_RESET:
                return {
                    ...state,
                    success: false
                };
    
        case CLEAR_ERRORS:
            return {
                ...state,
                errorFav: null
            }
    
        default:
            return state;
    }
}

export const removeFromFavReducer = (state= {item: {}}, action) => {
    switch (action.type) {
        case REMOVE_FROM_FAV_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case REMOVE_FROM_FAV_SUCCESS:
            return {
                ...state,
                loading: false,
                idRemoved: action.payload?.success,
                message: action.payload?.message,
            }
    
        case REMOVE_FROM_FAV_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case REMOVE_FROM_FAV_RESET:
                return {
                    ...state,
                    idRemoved: false
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