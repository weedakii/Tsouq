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
    CLEAR_ERRORS,
    DELETE_CATEGORY_RESET,
    CREATE_CATEGORY_RESET
} from "../constants/categoryConst"

export const categoryReducer = (state = {category: []}, action) => {
    switch (action.type) {
        case CATEGORY_REQUEST:
            return {
                loading: true,
                category: []
            }
    
        case CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload
            }
    
        case CATEGORY_FAIL:
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

export const createCategorytReducer = (state= {category: {}}, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case CREATE_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload.category,
                success: action.payload.success,
            }
    
        case CREATE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case CREATE_CATEGORY_RESET:
                return {
                    ...state,
                    success: false
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

export const deleteCategoryReducer = (state= {category: {}}, action) => {
    switch (action.type) {
        case DELETE_CATEGORY_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case DELETE_CATEGORY_SUCCESS:
            return {
                loading: false,
                ...state,
                isDeleted: action.payload,
            }
    
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case DELETE_CATEGORY_RESET:
                return {
                    ...state,
                    isDeleted: false
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