import express from 'express';
import { createCarousel, createCategory, deleteCarusel, deleteCategory, getCarousel, getCategory, getSingleCarusel } from '../controller/categoryCotroller.js';
import { createOrder, deleteOrder, getAllOrders, getMyOrder, getSingleOrder, updateRole } from '../controller/orderController.js';
import { createProduct, adminGetProducts, updateProduct, deleteProduct, getProducts, getSingleProduct, homeProducts } from '../controller/productController.js';
import { adminDeleteUser, adminGetAllUsers, adminGetOneUser, adminUpdateUser, forgotPassword, googleLogin, loginUser, logoutUser, registerUser, resetPassword, userChangePassword, userProfile, userUpdateProfile } from '../controller/userController.js';
import { authRoles, isAuthenticated } from '../utils/auth.js';
import { createFavourite, deleteFavourite, getAllFavourite } from '../controller/favouriteController.js';
import { uploadCarusel, uploadCategory, uploadProducts } from '../utils/uploader.js';

const router = express.Router();
// category and carusel routes
router.route('/category').get(getCategory)
router.route('/carusels').get(getCarousel)
// favourite routes
router.route('/favourite').get(isAuthenticated ,getAllFavourite)
router.route('/favourite/new').post(isAuthenticated ,createFavourite)
router.route('/favourite/:id').delete(isAuthenticated ,deleteFavourite)
// products routes
router.route('/home').get(homeProducts)
router.route('/products').get(getProducts)
router.route('/product/:id').get(getSingleProduct)
// user routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/googleLogin').post(googleLogin)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticated ,userProfile)
router.route('/me/update').put(isAuthenticated ,userUpdateProfile)
router.route('/password/update').put(isAuthenticated ,userChangePassword)
// order routes
router.route('/order/new').post(isAuthenticated, createOrder)
router.route('/order/:id').get(isAuthenticated, getSingleOrder)
router.route('/orders/me').get(isAuthenticated, getMyOrder)
// admin routes
router.route('/weed/category/new').post(isAuthenticated, authRoles('admin'), uploadCategory, createCategory)
router.route('/weed/category/:id').delete(isAuthenticated, authRoles('admin'), deleteCategory)
router.route('/weed/new/carusel').post(isAuthenticated, authRoles('admin'), uploadCarusel, createCarousel)
router.route('/weed/carusel/:id')
            .get(isAuthenticated, authRoles('admin'), getSingleCarusel)
            .delete(isAuthenticated, authRoles('admin'), deleteCarusel)
router.route('/weed/products').get(isAuthenticated, authRoles('admin'), adminGetProducts)
router.route('/weed/product/new').post(isAuthenticated, authRoles('admin'), uploadProducts, createProduct)
router.route('/weed/product/:id')
            .delete(isAuthenticated, deleteProduct)
            .put(isAuthenticated, updateProduct)
router.route('/weed/users').get(isAuthenticated, authRoles('admin'), adminGetAllUsers)
router.route('/weed/user/:id')
            .get(isAuthenticated, authRoles('admin'), adminGetOneUser)
            .delete(isAuthenticated, authRoles('admin'), adminDeleteUser)
            .put(isAuthenticated, authRoles('admin'), adminUpdateUser);
router.route('/weed/orders').get(isAuthenticated, authRoles('admin'), getAllOrders)
router.route('/weed/order/:id')
            .put(isAuthenticated, authRoles('admin'), updateRole)
            .delete(isAuthenticated, authRoles('admin'), deleteOrder)

export default router