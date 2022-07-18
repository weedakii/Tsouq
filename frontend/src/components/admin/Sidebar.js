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
    <div className="hidden fixed w-[180px] sm:flex border-r-2 border-slate-400 flex-col gap-2 overflow-auto justify-between max-h-[calc(100vh-100px)] sm:p-2 p-1">
        <div className="sidebar">
            <Link to='/'>Tsouq</Link>
            <Link to='/admin/dashboard'>
                <p>
                    <Dashboard />
                    <span className='hidden sm:block'>Dashboard</span>
                </p>
            </Link>
            <div>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to='/admin/products' className="mb-4">
                            <TreeItem sx={{margin: '8px 0'}} nodeId="2" label={window.innerWidth > 600 ? "All" : ""} icon={<PostAddIcon />} />
                        </Link>
                        <Link to='/admin/create/product'>
                            <TreeItem nodeId="3" label={window.innerWidth > 600 ? "Create" : ""} icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>
            <Link to='/admin/orders'>
                <p>
                    <ListAltIcon />
                    <span className='hidden sm:block'>Orders</span>
                </p>
            </Link>
            <Link to='/admin/users'>
                <p>
                    <PeopleAltIcon />
                    <span className='hidden sm:block'>Users</span>
                </p>
            </Link>
            <Link to='/admin/RateReviewIcon'>
                <p>
                    <RateReviewIcon />
                    <span className='hidden sm:block'>Reviews</span>
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