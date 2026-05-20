import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SingUp'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AllCourses from './pages/AllCourses'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import EnrolledCourse from './pages/EnrolledCourses'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import ViewLecture from './pages/ViewLecture'
import ViewCourse from './pages/ViewCourse'
import CreateCourse from './pages/Educator/CreateCourses'
import EditCourses from './pages/Educator/EditCourses'
import EditLecture from './pages/Educator/EditLecture'
import CreateLecture from './pages/Educator/createLeacture'
import { ToastContainer } from "react-toastify";
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import getCreatorCourse from './customHooks/getCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import ScrollToTop from './components/ScrollToTop'
import getAllReviews from './customHooks/getAllReviews'
import SearchWithAi from './pages/SearchWithAI'


export const serverUrl = "http://localhost:8000"

function App() {
    getCurrentUser();
    getCreatorCourse();
    getPublishedCourse();
    getAllReviews();
    const { userData } = useSelector(state => state.user)
    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
                <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
                <Route path='/forgetpassword' element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />} />
                <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
                <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />
                <Route path='/viewcourse/:courseId' element={userData?<ViewCourse/>:<Navigate to={"/signup"}/>}/>
                <Route path='/enrolledcourses' element={userData?<EnrolledCourse/>:<Navigate to={"/signup"}/>}/>
                <Route path='/search' element={userData?<SearchWithAi/>:<Navigate to={"/signup"}/>}/>


                <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
                <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
                <Route path='/createcourses' element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/signup"} />} />
                <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourses /> : <Navigate to={"/signup"} />} />
                <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
                <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
                  <Route path='/viewlecture/:courseId' element={userData?<ViewLecture/>:<Navigate to={"/signup"}/>}/>


            </Routes>
        </>
    )
}

export default App