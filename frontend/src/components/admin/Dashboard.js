import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import MetaData from '../layout/MetaData';
import { allOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(state => state.adminProducts)
  const {orders} = useSelector(state => state.allOrders)
  const { users} = useSelector(state => state.allUsers)
  let outOfStock = 0;
  let totalAmount = 0;
  products && products.forEach(p => {
    if (p.stock <= 0) {
      outOfStock += 1;
    }
  })
  orders && orders.map(i => (
    totalAmount += i.totalPrice
  ))

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        hoverBackgroundColor: ["rgb(197, 72, 48)"],
        backgroundColor: ["tomato"],
        data: [0, totalAmount]
      }
    ]
  }
  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        hoverBackgroundColor: ["#4b5606", "#35014f"],
        backgroundColor: ["#90a604", "#680084"],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  }

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(allOrders())
    dispatch(getAllUsers())
  }, [dispatch])
  

  return (
    <>
    <MetaData title={'Dashboard'} />
      <div className="sm:grid-cols-sid grid-cols-1 grid gap-2 sm:p-5 p-2 w-screen max-w-[100%]">
        <div className="sm:max-w-[250px] sm:min-w-[200px]">
          <Sidebar />
        </div>
        <div>
          <h2 className="text-3xl text-slate-800 text-center py-3 font-bold font-serif" style={{letterSpacing: '2px'}}>Dashboard</h2>
          {/*  */}
          <div className="rounded-lg mb-4 py-3 text-lg font-semibold bg-sky-600 text-slate-100 text-center">
            <p>Total Money</p>
            <span>{totalAmount}$</span>
          </div>
          {/*  */}
          <div className="flex gap-3 justify-evenly font-mono my-6 h-auto">
            <Link to="/admin/products">
              <div className="bg-slate-800 text-slate-50 md:w-36 md:h-36 sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center flex-col rounded-full md:font-semibold md:text-lg sm:text-sm text-[12px]">
                  <p>Products</p>
                  <span>{products && products.length}</span>
              </div>
            </Link>
            <Link to="/admin/orders">
              <div className="bg-red-600 text-slate-50 md:w-36 md:h-36 sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center flex-col rounded-full md:font-semibold md:text-lg sm:text-sm text-[12px]">
                <p>Orders</p>
                <span>{orders && orders.length}</span>
              </div>
            </Link>
            <Link to="/admin/users">
              <div className="bg-emerald-600 text-slate-50 md:w-36 md:h-36 sm:w-28 sm:h-28 w-20 h-20 flex items-center justify-center flex-col rounded-full md:font-semibold md:text-lg sm:text-sm text-[12px]">
                <p>Users</p>
                <span>{users && users.length}</span>
              </div>
            </Link>
          </div>
          {/*  */}
          <div className="lg:w-4/5 w-[95%] my-8 mx-auto">
            <Line data={lineState} />
          </div>
          <div className="lg:w-4/5 w-[95%] max-w-[320px] mb-4 mx-auto">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard