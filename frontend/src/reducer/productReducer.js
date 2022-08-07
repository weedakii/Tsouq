import { 
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    HOME_REQUEST,
    HOME_SUCCESS,
    HOME_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORS,
} from "../constants/productConst"


export const createProductReducer = (state= {products: {}}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success,
            }
    
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case CREATE_PRODUCT_RESET:
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

export const deleteProductReducer = (state= {products: {}}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                ...state,
                isDeleted: action.payload,
            }
    
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                ...state,
                isUpdated: action.payload,
            }
    
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
    
        case DELETE_PRODUCT_RESET:
                return {
                    ...state,
                    isDeleted: false
                };
    
        case UPDATE_PRODUCT_RESET:
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

export const adminProductsReducer = (state= {products: []}, action) => {
    switch (action.type) {
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
    
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
            }
    
        case ADMIN_PRODUCTS_FAIL:
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

export const productReducer = (state= {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case HOME_REQUEST:
            return {
                loading: true,
                products: []
            }
    
        case ALL_PRODUCTS_SUCCESS:
        case HOME_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage,
                filteredProducts: action.payload.filteredProducts,
            }
    
        case ALL_PRODUCTS_FAIL:
        case HOME_FAIL:
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

export const  productDetailsReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
    
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
    
        case PRODUCT_DETAILS_FAIL:
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

export const categoryReducer = (state = {category: []}, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                loading: true,
                category: []
            }
    
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload.category
            }
    
        case ALL_CATEGORY_FAIL:
            return {
                loading: false,
                category: action.payload 
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