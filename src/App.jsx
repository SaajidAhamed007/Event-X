import React, { useEffect } from "react"
import { Navigate, Route,Routes } from "react-router-dom"
import Login from "./components/login"
import Signup from "./components/Signup"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AddEvent from "./pages/admin/AddEvent"
import { useAuthStore } from "./stores/useAuthStore"
import HomePage from "./pages/user/Home"
import Navbar from "./components/navbar"
import BottomNav from "./components/BottomNav"
import Profile from "./pages/Profile"
import OrganizerProfile from "./pages/user/OrganizerProfile"
import EventDetails from "./pages/admin/EventDetails"
import RegistrantList from "./pages/user/RegistrantList"
import { Toaster } from "react-hot-toast"
import RegisteredEvents from "./pages/user/RegisteredEvents"

function App() {
  const { user } = useAuthStore();


  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);

  return (
    <div className="min-h-screen"> 
      {user?.role && <Navbar />}
      <Routes>
        <Route path="/" element={user ? user.role=="user" ? <HomePage /> : <AdminDashboard /> : <Login/>}></Route>
        <Route path="/profile" element = {user? <Profile /> : <Login />}></Route>
        <Route path="/add-event" element={user?.role=='organizer' ? <AddEvent /> : <Navigate to={"/"}/> }></Route>
        <Route path="/organizer-profile" element = {user ? <OrganizerProfile /> : <Login />}></Route>
        <Route path="/event/:id" element={user ? <EventDetails /> : <Login />}></Route>
        <Route path="/login" element={ !user ? <Login /> : <Navigate to={"/"} /> }></Route>
        <Route path="/signup" element={ !user ? <Signup /> : <Navigate to={"/"} />}></Route>
        <Route path="/event/:id/registrants" element = {user ? <RegistrantList /> : <Login />}></Route>
        <Route path="/registered-events" element ={user ? <RegisteredEvents /> : <Login />}></Route>
      </Routes>
      {user?.role && user.role==="user" && <BottomNav />}
      <Toaster></Toaster>
    </div>
  )
}

export default App
