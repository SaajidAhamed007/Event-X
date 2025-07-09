import React, { useEffect, useState } from 'react';
import { Calendar, Delete, DeleteIcon, Home, Loader2, Pencil, Plus, Trash, User } from 'lucide-react';
import {useSwipeable} from "react-swipeable"
import { useEventStore } from '../../stores/useEventStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab('past'),
    onSwipedRight: () => setActiveTab('upcoming'),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  const { events,getEventsByCreaterId,isLoading } = useEventStore();
  const { user } = useAuthStore()

  useEffect(() => {
    getEventsByCreaterId(user.uid);
  },[user.uid])
  


  const today = new Date();
  today.setHours(0,0,0,0);

  const filteredEvents = events.filter(event => {
    const eventDate = event.date instanceof Date ? event.date : event.date?.toDate?.() || new Date(event.date);
    return activeTab === 'upcoming' ? eventDate >= today : eventDate < today;
  });

  if(isLoading) return(
    <div className='flex justify-center items-center h-screen'>
      <Loader2 size={20} className='animate-spin' />
    </div>
  )

  return (
    <div className=" bg-[#f8f9fc] font-['Plus Jakarta Sans','Noto Sans',sans-serif]">

      {/* Tabs */}
      <div className="flex items-center justify-center border-b border-[#ced3e9] px-2 gap-10">
        <button
          className={`flex flex-col items-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'upcoming' ? 'border-[#4768fa] text-[#47579e] ' : 'border-transparent text-[#0d0f1c]'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <span className="text-md font-bold">Upcoming</span>
        </button>
        <button
          className={`flex flex-col items-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'past' ? 'border-[#4768fa] text-[#47579e]' : 'border-transparent text-[#0d0f1c] '}`}
          onClick={() => setActiveTab('past')}
        >
          <span className="text-md font-bold">Past</span>
        </button>
      </div>

      

      <button className="hidden lg:flex fixed bottom-24 right-7 z-10 h-12 w-12 rounded-full bg-[#607afb] text-white items-center justify-center shadow-lg ">
        <Plus size={28} />
      </button>

      <div className='flex items-center justify-center'>
        <div className="w-2xl p-4 grid gap-4 sm:grid-cols-1  xl:grid-cols-3">
            {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
            <div key={index} className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div
                className="w-full aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${event.bannerURL})` }}
                ></div>
                <div className='flex justify-between'>
                  <div className="flex flex-col justify-center gap-1 p-4 w-full">
                    <p className="text-[#0e141b] text-lg font-bold tracking-[-0.015em]">{event.title}</p>
                    <p className="text-[#4e7397] text-base">{event.date.toDate().toLocaleDateString()}</p>
                    <p className="text-[#4e7397] text-base">{event.date.toDate().toLocaleTimeString()}</p>
                  </div>

                  <div className='flex gap-2 items-center pr-3'>
                    <Link to={`/event/${event.id}`}>
                      <button className="flex items-center gap-1 h-8 px-4 bg-[#e6e9f4] text-sm font-medium rounded-full text-[#0d0f1c]">
                        <Pencil size={18} /> View
                      </button>
                    </Link>
                  </div>
                </div>
            </div>
            ))):(
              <p className="text-center text-sm text-[#47579e]">No {activeTab} events.</p>
            )}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

