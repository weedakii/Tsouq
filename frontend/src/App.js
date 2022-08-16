import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './components/auth/Register';
import Signin from './components/auth/Signin';
import Home from './components/home/Home';
import Header from './components/layout/Header';
import ProductDetails from './components/product/ProductDetails';
import AllProducts from './components/products/AllProducts';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userAction';
import {useSelector} from 'react-redux'
import Profile from './components/auth/Profile';
import UpdateProfile from './components/auth/UpdateProfile';
import UpdatePassword from './components/auth/UpdatePassword';
import ForgotPassword from './components/auth/ForgotPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import OrderConfirm from './components/cart/OrderConfirm';
import Success from './components/cart/Success';
import UserOrders from './components/cart/UserOrders';
import OrderDet from './components/cart/OrderDet';
import ProtectedRoute from './components/routes/ProtectedRoute';
import NotFound from './NotFound';
import Dashboard from './components/admin/Dashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminProductCreate from './components/admin/AdminProductCreate';
import { getCategory } from './actions/productAction';
import UpdateProduct from './components/admin/UpdateProduct';
import AdminOrders from './components/admin/AdminOrders';
import AdminOrderUpdate from './components/admin/AdminOrderUpdate';
import AdminUsers from './components/admin/AdminUsers';
import UpdateRole from './components/admin/UpdateRole';
import AdminReviews from './components/admin/AdminReviews';
import Footer from './components/layout/Footer';
import Favourite from './components/fav/Favourite';
import AdminCarusels from './components/admin/AdminCarusels';
import AdminCaruselUpdate from './components/admin/AdminCaruselUpdate';
import ContactUs from './components/layout/ContactUs';
import { myFavourite } from './actions/favAction';


function App() {
  const {user, isAuthenticated} = useSelector(state => state.user)
  useEffect(() => {
    const fetchData = () => {
      store.dispatch(loadUser())
      store.dispatch(getCategory())
      store.dispatch(myFavourite())
    }
    fetchData()
  }, [])

  return (
    <div className="h-full min-h-screen relative flex flex-col justify-between">
      <Router>
        {isAuthenticated ? <Header user={user} /> : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:keyword' element={<AllProducts />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/profile/:keyword' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/me/update' element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          } />
          <Route path='/password/update' element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />
          <Route path='/password/forgot' element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favourite' element={
            <ProtectedRoute>
              <Favourite />
            </ProtectedRoute>
          } />
          <Route path='/shipping' element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          } />
          <Route path='/order/confirm' element={
            <ProtectedRoute>
              <OrderConfirm />
            </ProtectedRoute>
          } />
          <Route path='/success' element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />
          <Route path='/order/me' element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          } />
          <Route path='/orders/:id' element={
            <ProtectedRoute>
              <OrderDet />
            </ProtectedRoute>
          } />
          <Route path='/admin/dashboard' element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin/products' element={
            <ProtectedRoute isAdmin={true}>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path='/admin/create/product' element={
            <ProtectedRoute isAdmin={true}>
              <AdminProductCreate />
            </ProtectedRoute>
          } />
          <Route path='/admin/product/:id' element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          } />
          <Route path='/admin/orders' element={
            <ProtectedRoute isAdmin={true}>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path='/admin/order/:id' element={
            <ProtectedRoute isAdmin={true}>
              <AdminOrderUpdate />
            </ProtectedRoute>
          } />
          <Route path='/admin/users' element={
            <ProtectedRoute isAdmin={true}>
              <AdminUsers />
            </ProtectedRoute>
          } />
          <Route path='/admin/user/:id' element={
            <ProtectedRoute isAdmin={true}>
              <UpdateRole />
            </ProtectedRoute>
          } />
          <Route path='/admin/reviews' element={
            <ProtectedRoute isAdmin={true}>
              <AdminReviews />
            </ProtectedRoute>
          } />
          <Route path='/admin/carusels' element={
            <ProtectedRoute isAdmin={true}>
              <AdminCarusels />
            </ProtectedRoute>
          } />
          <Route path='/admin/carusel/:id' element={
            <ProtectedRoute isAdmin={true}>
              <AdminCaruselUpdate />
            </ProtectedRoute>
          } />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
