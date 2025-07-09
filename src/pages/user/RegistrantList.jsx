import React, { useState } from 'react'
import { useEventStore } from '../../stores/useEventStore'
import { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const RegistrantList = () => {

  const {id} = useParams();
  const { registrants, getRegistrants } = useEventStore();
  const [ searchInput,setSearchInput ] = useState("");

  useEffect(() => {
    getRegistrants(id);
  },[id,getRegistrants])


  const filteredRegistrants = registrants.filter(registrant => {
    return (
      registrant.name.toLowerCase().includes(searchInput.toLowerCase())
    )
  })

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f9f9fb] justify-between overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center bg-[#f9f9fb] p-4 pb-2 justify-between">
          <div className="text-[#0f111a] flex size-12 shrink-0 items-center">
            <Link to={"/"}>
              <ArrowLeft size={20}/>
            </Link>
          </div>
          <h2 className="text-[#0f111a] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Registrants
          </h2>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full items-stretch rounded-xl h-full">
              <div className="text-[#56618f] flex border-none bg-[#e9eaf2] items-center justify-center pl-4 rounded-l-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search registrants"
                value={searchInput}
                className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-xl text-[#0f111a] focus:outline-0 focus:ring-0 border-none bg-[#e9eaf2] h-full placeholder:text-[#56618f] px-4 rounded-l-none text-base font-normal"
                onChange={(e) => {setSearchInput(e.target.value)}}
              />
            </div>
          </label>
        </div>

        {/* List of Registrants */}
        {filteredRegistrants.map((reg, idx) => (
          <div key={idx} className="flex gap-4 bg-[#f9f9fb] px-4 py-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-[70px] w-fit"
              style={{ backgroundImage: `url("${reg.image}")` }}
            />
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-[#0f111a] text-base font-medium leading-normal">{reg.name}</p>
              <p className="text-[#56618f] text-sm font-normal leading-normal">{reg.email}</p>
              <p className="text-[#56618f] text-sm font-normal leading-normal">Registered on: {reg.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="h-5 bg-[#f9f9fb]" />
    </div>
  )
}

export default RegistrantList
