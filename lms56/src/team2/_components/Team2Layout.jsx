import React from 'react'
import { Outlet } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'

const Team2Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Breadcrumbs />
            <Outlet />
        </div>
    )
}

export default Team2Layout 