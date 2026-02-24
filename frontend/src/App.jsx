import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SingUp'
import Login from './pages/Login'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </>
    )
}

export default App