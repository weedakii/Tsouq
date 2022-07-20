import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productReducer, adminProductsReducer, categoryReducer, createProductReducer, deleteProductReducer } from './reducer/productReducer';
import { allUsersReducer, forgotPasswordReducer, upadteUserReducer, userDetailsReducer, userReducer } from './reducer/userReducer';
import { allOrdersReducer, createOrderReducer, myOrdersReducer, orderDetailsReducer, orderReducer } from './reducer/orderReducer';
import { cartReducer } from './reducer/cartReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    catygories: categoryReducer,
    user: userReducer,
    updateUser: upadteUserReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    createOrder: createOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    adminProducts: adminProductsReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    order: orderReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store