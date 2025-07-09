import React from 'react'
import {  Search,Home,Bookmark,User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useUIStore } from '../stores/useUIStore'

const BottomNav = () => {

    const {setTriggerFocus} = useUIStore();
    const navigate = useNavigate()

    const onSearchClick = () => {
        setTriggerFocus(true);
        navigate("/")
    }

  return (
    <div className='fixed bottom-0 w-full'>
        <div className="border-t border-[#e7edf3] bg-slate-50 px-4 pb-3 pt-2 flex justify-around ">
                    
            <Link to={"/"}>
                <button  className='flex flex-col items-center text-[#4e7397] text-xs'>
                    <Home className="w-6 h-6" />
                </button>
            </Link>

            <button  onClick={onSearchClick} className='flex flex-col items-center text-[#4e7397] text-xs'>
                <Search className="w-6 h-6" />
            </button>

            <Link to={"/registered-events"}>
                <button className='flex flex-col items-center text-[#4e7397] text-xs'>
                    <Bookmark className="w-6 h-6" />
                </button>
            </Link>

            <Link to={"/profile"}>
                <button className='flex flex-col items-center text-[#4e7397] text-xs'>
                    <User className="w-6 h-6" />
                </button>
            </Link>
        </div>
    </div>
  )
}

export default BottomNav
