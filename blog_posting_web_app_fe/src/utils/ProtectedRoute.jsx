import React, { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContex'
import { useNavigate, Link, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    console.log(user)
    useEffect(() => {
        // navigate('/login')
    },)

    return (user?.isLoggedIn ? <>
        {children}</> : <Navigate to='/login'></Navigate>)

}
