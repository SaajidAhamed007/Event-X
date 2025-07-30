import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Eye, Loader2, X } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { useAuthStore } from '../../stores/useAuthStore';

const RegisteredEvents = () => {
  const { getRegisteredEventsByUser, userRegistrations, isLoading } = useEventStore();
  const { user } = useAuthStore();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    Level: '',
    Type: '',
    Format: '',
  });

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleFilterSelect = (category, value) => {
    setSelectedFilters((prev) => ({ ...prev, [category]: value }));
    setOpenDropdown(null); // close dropdown after selection
  };

  useEffect(() => {
    getRegisteredEventsByUser(user.uid);
  }, [user.uid]);

  useEffect(() => {
  console.log("Fetched registrations:", userRegistrations);
}, [userRegistrations]);

  console.log(userRegistrations)

  if (isLoading) {
    return (
      <div className='min-h-screen flex h-[60vh] w-full justify-center items-center'>
        <Loader2 className='animate-spin' />
      </div>
    );
  }

  const filteredEvents = userRegistrations.filter((event) => {
    const matchesLevel =
      selectedFilters.Level === '' || event.level === selectedFilters.Level;
    const matchesType =
      selectedFilters.Type === '' || event.type === selectedFilters.Type;
    const matchesFormat =
      selectedFilters.Format === '' || event.format === selectedFilters.Format;
    return matchesLevel && matchesType && matchesFormat;
  });

  return (
    <div className='h-screen'>

      <div className="flex  flex-wrap gap-3 p-4 md:justify-center sm:justify-start ">
        
        <div className="relative">
          <button
            onClick={() => toggleDropdown('Level')}
            className="flex h-8 items-center gap-2 rounded-xl bg-[#e7edf3] px-4 text-sm font-medium text-[#0e141b]"
          >
            {selectedFilters.Level || 'Level'}
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'Level' && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <div
                  key={level}
                  onClick={() => handleFilterSelect('Level', level)}
                  className="cursor-pointer rounded-md px-3 py-1 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {level}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleDropdown('Type')}
            className="flex h-8 items-center gap-2 rounded-xl bg-[#e7edf3] px-4 text-sm font-medium text-[#0e141b]"
          >
            {selectedFilters.Type || 'Type'}
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'Type' && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg">
              {['Workshop', 'Seminar', 'Webinar'].map((type) => (
                <div
                  key={type}
                  onClick={() => handleFilterSelect('Type', type)}
                  className="cursor-pointer rounded-md px-3 py-1 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleDropdown('Format')}
            className="flex h-8 items-center gap-2 rounded-xl bg-[#e7edf3] px-4 text-sm font-medium text-[#0e141b]"
          >
            {selectedFilters.Format || 'Format'}
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'Format' && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg">
              {['Online', 'Offline', 'Hybrid'].map((format) => (
                <div
                  key={format}
                  onClick={() => handleFilterSelect('Format', format)}
                  className="cursor-pointer rounded-md px-3 py-1 text-sm text-gray-800 hover:bg-gray-100"
                >
                  {format}
                </div>
              ))}
            </div>
          )}
        </div>

        {(selectedFilters.Level || selectedFilters.Type || selectedFilters.Format) && (
            <button
                onClick={() => setSelectedFilters({ Level: '', Type: '', Format: '' })}
                className="flex h-8 items-center gap-2 rounded-xl bg-[#e7edf3] px-4 text-sm font-medium text-[#0e141b]"
            >
                <X />Clear Filters
            </button>
        )}
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-7xl grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
              >
                <div
                  className="w-full aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.bannerURL})` }}
                ></div>
              
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center gap-1 p-4 w-full">
                    <p className="text-[#0e141b] text-lg font-bold tracking-[-0.015em]">
                      {event.title}
                    </p>
                    <p className="text-[#4e7397] text-base">
                      {event.date.toDate().toLocaleDateString()}
                    </p>
                    <p className="text-[#4e7397] text-base">
                      {event.date.toDate().toLocaleTimeString()}
                    </p>
                  </div>
              
                  <div className="flex gap-2 items-center pr-4">
                    <Link to={`/event/${event.id}`}>
                      <button className="flex items-center gap-1 h-8 px-4 bg-[#e6e9f4] text-sm font-medium rounded-full text-[#0d0f1c]">
                        <Eye size={18} /> View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
                <p className="text-gray-600 text-center text-base">
                    No events match the selected filters.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredEvents;

