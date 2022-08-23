import Dashboard from '@mui/icons-material/Dashboard'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt'
import RateReviewIcon from '@mui/icons-material/RateReview';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import CategoryIcon from '@mui/icons-material/Category';
import TreeItem from '@mui/lab/TreeItem';
import { Avatar } from '@mui/material'

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css'
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const {user} = useSelector(state => state.user)
    const router = useLocation()
    const isActive = (r) => {
        if (r === router.pathname) {
            return " -mr-2 bg-slate-900 text-white"
        } else {
            return ""
        }
    }
  return (
    <div className="bg-white overflow-x-hidden sm:fixed absolute w-[180px] flex sm:shadow-none shadow-xl border-r-2 border-2 border-slate-400 flex-col gap-2 overflow-auto justify-between max-h-[calc(100vh-100px)]">
        <div className="sidebar">
            <div className='text-center'>
                <Link to='/'>Tsouq</Link>
            </div>
            <Link className={"mx-4 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/dashboard`)} to='/admin/dashboard'>
                <p>
                    <Dashboard />
                    <span className=' sm:block text-inherit'>Dashboard</span>
                </p>
            </Link>
            <div className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/products`)}>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to='/admin/products' className="mb-4">
                            <TreeItem sx={{margin: '8px 0'}} nodeId="2" label={"All"} icon={<PostAddIcon />} />
                        </Link>
                        <Link to='/admin/create/product'>
                            <TreeItem nodeId="3" label={"Create"} icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>
            <Link className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/orders`)} to='/admin/orders'>
                <p>
                    <ListAltIcon />
                    <span className=' sm:block text-inherit'>Orders</span>
                </p>
            </Link>
            <Link className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/users`)} to='/admin/users'>
                <p>
                    <PeopleAltIcon />
                    <span className=' sm:block text-inherit'>Users</span>
                </p>
            </Link>
            <Link className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/carusels`)} to='/admin/carusels'>
                <p>
                    <ViewCarouselIcon />
                    <span className=' sm:block text-inherit'>Carusels</span>
                </p>
            </Link>
            <Link className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/categories`)} to='/admin/categories'>
                <p>
                    <CategoryIcon />
                    <span className=' sm:block text-inherit'>Categories</span>
                </p>
            </Link>
            <Link className={"mx-4 -mr-2 hover:bg-slate-800 transition-all duration-700" + isActive(`/admin/reviews`)} to='/admin/reviews'>
                <p>
                    <RateReviewIcon />
                    <span className=' sm:block text-inherit'>Reviews</span>
                </p>
            </Link>
        </div>
        {/*  */}
        <div className='text-center py-4 border-t-2 border-slate-400 h-full flex-[0.2] flex items-center justify-center gap-2'>
            <Avatar src={user?.avatar?.url} className="text-slate-900 shadow-sh" sx={{width: window.innerWidth > 700 ? '50px' : '40px', height: window.innerWidth > 700 ? '50px' : '40px'}} />
            <span className='font-semibold md:text-lg text-slate-800'>{user?.name}</span>
        </div>
    </div>
  )
}

export default Sidebar