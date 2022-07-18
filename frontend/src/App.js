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


function App() {
  const {user, isAuthenticated} = useSelector(state => state.user)
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(getCategory())
  }, [])

  return (
    <div className="App">
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
