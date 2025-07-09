import { ChevronDown, Search } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { useUIStore } from '../../stores/useUIStore';
import UserEventList from '../../components/UserEventList';

const HomePage = () => {
    const searchInputRef = useRef();
    const { triggerFocus,setTriggerFocus } = useUIStore();

    useEffect(() => {
        if(triggerFocus){
            searchInputRef.current?.focus();
            setTriggerFocus(false);
        }
    },[triggerFocus])


  return (
    <div>
        <div
            className="relative flex flex-col bg-slate-50 justify-between overflow-x-hidden mt-4"
            style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}
        >

        {/* Search Bar */}
            <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full rounded-xl h-full">
                    <div className="text-[#4e7397] bg-[#e7edf3] pl-4 flex items-center justify-center rounded-l-xl">
                    <Search />
                    </div>
                    <input
                    ref={searchInputRef}
                    placeholder="Search events"
                    className="form-input flex-1 bg-[#e7edf3] rounded-r-xl text-[#0e141b] placeholder-[#4e7397] px-4 text-base focus:outline-none"
                    />
                </div>
                </label>
            </div>
        <UserEventList />
        </div>
    </div>
  )
}

export default HomePage
