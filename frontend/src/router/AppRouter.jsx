import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import MainApp from '../pages/MainApp'
import DashboardOverview from '@/pages/Dashboard'

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path="/app/:userId" element={<MainApp />}>
                   <Route index element={<DashboardOverview/>}></Route>

                </Route>
            </Routes>
        </>
    )
}

export default AppRouter