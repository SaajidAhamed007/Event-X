import { LogOut, Plus, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

const Navbar = () => {

  const {setUser,user} = useAuthStore();

  return (
    <div className="flex items-center justify-between border-b border-[#ced3e9] bg-slate-50 p-2 pb-2  ">
        <Link to={"/"}>
          <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1  pl-6">
            Events
          </h2>
        </Link>
      
        <div className="flex w-12 items-center gap-5 justify-end pr-5">
          {user.role ==="organizer" && (
            <Link to={"/add-event"}>
              <button className="flex p-1 items-center justify-center border-b-1 border-b-transparent  text-[#0e141b] hover:border-b hover:border-black ">
                <span><Plus /></span>
                Add
              </button>
            </Link>
          )}
          <Link to={"/profile"}>
            <button className="flex p-1 items-center justify-center border-b-1 border-b-transparent  text-[#0e141b] hover:border-b hover:border-black ">
              <span><User /></span>
              Profile
            </button>
          </Link>
        <button onClick={() => {setUser(null)}} className="flex p-1 items-center border-b-1 border-b-transparent  justify-center  text-[#0e141b] hover:border-b hover:border-black">
            <span><LogOut /></span>
            Logout
        </button>
        </div>
    </div>
  )
}

export default Navbar
