import Badge from '@mui/material/Badge';
import { Avatar, SpeedDial, SpeedDialAction } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useAlert} from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { logout } from '../../actions/userAction';
import { myFavourite } from '../../actions/favAction';


const Navbar = ({user}) => {
    const actions = [
        { icon: <Link to="/order/me"><ListAltIcon /></Link> , name: 'Orders' },
        { icon: <Link to="/profile"><PersonIcon /></Link> , name: 'Profile' },
        { icon: <Link to="/contact"><ContactMailIcon /></Link> , name: 'Contact' },
        { icon: <LogoutIcon color='error' />, name: 'Logout', func: logoutUser },
    ];

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)
    const [isDark, setIsDark] = useState(false)

    if (user && user.role === 'admin') {
        actions.unshift({icon: <Link to="/admin/dashboard"><DashboardIcon /></Link>, name: 'Dashboard'})
    }
    
    // const handleChange = (e) => {
    //     localStorage.setItem('isDark', e.target.checked)
    //     setTimeout(() => {
    //         setIsDark(e.target.checked);
    //         window.location.reload()
    //     }, 500);
    // };

    function logoutUser() {
        dispatch(logout())
        alert.success(`User logged out successfully`)
        navigate('/signin')
    }

    const router = useLocation()
    const isActive = (r) => {
        if (r === router.pathname || (router.pathname === '/admin/dashboard' && r === '/dashboard')) {
            return " text-mainDarkColor"
        } else if(router.pathname === '/order/me' && r === '/orders') {
            return " text-mainDarkColor"
        } else {
            return ""
        }
    }

    useEffect(() => {
        if (localStorage.getItem('isDark') === 'true') {
            setIsDark(true);
        } else if (localStorage.getItem('isDark') === 'false') {
            setIsDark(false);
        }
        dispatch(myFavourite())
    }, [dispatch])
    
    
    return (
        <div dir='rtl' className= {isDark ? "dark sticky top-0 left-0 z-[999]" : "sticky top-0 left-0 z-[999]"} >
            <header className='bg-white shadow-md py-[10px] dark:bg-slate-900'>
            <div className='mx-auto px-4 font-tajawal sm:px-8 max-w-7xl flex items-center justify-between'>
                <div className='text-mainDarkColor font-bold text-2xl'>
                <Link to='/' className='font-cairo'>
                    تسوق
                </Link>
                </div>
                <div className='flex items-center gap-3 font-serif text-base font-medium text-black'>
                {/* <Switch
                    checked={isDark}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="success"
                /> */}
                <Link to='/products'>
                    <span className={'hover:text-emerald-900 font-tajawal dark:hover:text-mainDarkColor dark:text-slate-200' + isActive('/products')}>منتجاتنا</span>
                </Link>
                <Link to='/cart' className='mx-2'>
                    <span className={'flex items-center dark:text-slate-200 gap-1 dark:hover:text-mainDarkColor hover:text-mainDarkColor' + isActive('/cart')}> 
                        <Badge badgeContent={cartItems?.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </span>
                </Link>
                <Link to='/favourite'>
                    <span className={'flex items-center dark:text-slate-200 gap-1 dark:hover:text-mainDarkColor hover:text-mainDarkColor' + isActive('/cart')}> 
                        <FavoriteIcon color='error' className='active:scale-50' />
                    </span>
                </Link>
                <div className='relative w-6 h-6 ml-3'>
                    {
                        user ? (
                        <SpeedDial
                            dir='rtl'
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', top: -8, left: -20 }}
                            icon={<Avatar src={user && user.avatar.url} />}
                            direction="down"
                            FabProps={{
                                sx: {
                                width: '38px',
                                height: '38px',
                                }
                            }}
                            >
                            {actions.map((action) => (
                                <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                onClick={action.func}
                                tooltipTitle={action.name}
                                tooltipPlacement="right"
                                tooltipOpen={window.innerWidth < 600 ? true : false}
                                FabProps={{
                                    sx: {
                                    color: isActive('/'+action.name.toLowerCase()) && "darkgreen"
                                    }
                                }}
                                
                                />
                            ))}
                        </SpeedDial>
                        ) : (
                            <Link to='/signin'><Avatar sx={{position: 'absolute', top: -8, left: -7}} /></Link>
                        )
                    }
                    
                </div>
                </div>
            </div>
            </header>
        </div>
    )
}

export default Navbar