import Dashboard from '@mui/icons-material/Dashboard'
import PostAddIcon from '@mui/icons-material/PostAdd'
import AddIcon from '@mui/icons-material/Add'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt'
import RateReviewIcon from '@mui/icons-material/RateReview';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Avatar } from '@mui/material'

import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className="bg-white sm:fixed absolute w-[180px] flex border-r-2 border-slate-400 flex-col gap-2 overflow-auto justify-between max-h-[calc(100vh-100px)] sm:p-2 p-1">
        <div className="sidebar">
            <div className=''>
                <Link to='/'>Tsouq</Link>
            </div>
            <Link to='/admin/dashboard'>
                <p>
                    <Dashboard />
                    <span className=' sm:block'>Dashboard</span>
                </p>
            </Link>
            <div>
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
            <Link to='/admin/orders'>
                <p>
                    <ListAltIcon />
                    <span className=' sm:block'>Orders</span>
                </p>
            </Link>
            <Link to='/admin/users'>
                <p>
                    <PeopleAltIcon />
                    <span className=' sm:block'>Users</span>
                </p>
            </Link>
            <Link to='/admin/carusels'>
                <p>
                    <PeopleAltIcon />
                    <span className=' sm:block'>Carusels</span>
                </p>
            </Link>
            <Link to='/admin/reviews'>
                <p>
                    <RateReviewIcon />
                    <span className=' sm:block'>Reviews</span>
                </p>
            </Link>
        </div>
        {/*  */}
        <div className='text-center py-4 border-t-2 border-slate-400 h-full flex-[0.2] flex items-center justify-start gap-2'>
            <Avatar className="text-slate-900" sx={{width: window.innerWidth > 700 ? '50px' : '40px', height: window.innerWidth > 700 ? '50px' : '40px'}} />
            <span className='font-semibold md:text-lg text-slate-800'>Name</span>
        </div>
    </div>
  )
}

export default Sidebar