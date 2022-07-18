import React from 'react'
import { Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useAlert } from 'react-alert'

const ProtectedRoute = ({isAdmin, children}) => {
    const {loading, isAuthenticated, user} = useSelector(state => state.user)
    const alert = useAlert()

    if (loading === false && isAuthenticated === false) {
        alert.info("Login first to access this page")
        return <Navigate to="/signin" replace />
    }

    if (loading === false && (isAdmin === true && user.role !== 'admin')) {
        alert.info("Login first to access this page")
        return <Navigate to="/signin" replace />
    }

    return children
}

export default ProtectedRoute