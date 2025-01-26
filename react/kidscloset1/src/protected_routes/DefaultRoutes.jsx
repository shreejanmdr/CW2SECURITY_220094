
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const DefaultRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user'))
  return user!=null && user.isAdmin ? (
    <Navigate to="/admin/dashboard" /> 
  ):(
   user!=null && !user.isAdmin ? (
    <Navigate to="/product" /> 
  ):(
    <Outlet/>
  )
)
}

export default DefaultRoutes
