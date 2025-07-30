import { Loader2, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { useEventStore } from '../../stores/useEventStore';
import { uploadBannerToCloudinary } from '../../utils/uploadToCloudinary';

const AddEvent = () => {

  const navigate = useNavigate();

  const [bannerFile,setBannerFile] = useState()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    level: '',
    format: '',
    date: '',
    bannerURL: null,
    bannerPreview: '',
  });

  const { user } = useAuthStore();
  const { isLoading,addNewEvent } = useEventStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        bannerPreview: previewURL,
      }));
      setBannerFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!bannerFile){
      alert("Upload the banner");
      return;
    }
    try {
      const bannerURL = await uploadBannerToCloudinary(bannerFile)

      if(!bannerURL){
        alert("image upload file");
        return;
      }

      const eventData = {
        ...formData,
        bannerURL
      }
      addNewEvent(eventData,{
        uid:user.uid,
        name:user.name,
        email:user.email
      })
      navigate("/");
    } catch (error) {
      console.log("not added")
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className="relative flex min-h-screen flex-col justify-between items-center bg-[#f8f9fc] overflow-x-hidden w-full max-w-4xl"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        {/* Header */}
        <div className='w-full'>
          <div className="flex items-center justify-between bg-[#f8f9fc] p-4 pb-2">
            <div className="text-[#0d0f1c] flex size-12 items-center">
              <Link to={"/"}>
                <X size="30" />
              </Link>
            </div>
            <h2 className="flex-1 text-center text-lg font-bold tracking-[-0.015em] text-[#0d0f1c] pr-12">
              Create Event
            </h2>
          </div>

          {/* Event Title */}
          <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="form-input h-14 w-full rounded-xl bg-[#e6e9f4] p-4 text-base font-normal text-[#0d0f1c] placeholder:text-[#47569e] focus:outline-none"
                required
              />
            </label>
          </div>

          {/* Event Description */}
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event Description"
                className="form-input min-h-36 w-full resize-none rounded-xl bg-[#e6e9f4] p-4 text-base font-normal text-[#0d0f1c] placeholder:text-[#47569e] focus:outline-none"
                required
              ></textarea>
            </label>
          </div>

          {/* Dropdown Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4'>
            <select name="type" value={formData.type} onChange={handleChange} className="form-select rounded-xl bg-[#e6e9f4] p-2 text-[#0d0f1c]" required>
              <option value="">Select Event Type</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Bootcamp">Bootcamp</option>
            </select>
            <select name="level" value={formData.level} onChange={handleChange} className="form-select rounded-xl bg-[#e6e9f4] p-2 text-[#0d0f1c]" required>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select name="format" value={formData.format} onChange={handleChange} className="form-select rounded-xl bg-[#e6e9f4] p-2 text-[#0d0f1c]" required>
              <option value="">Select Format</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input rounded-xl bg-[#e6e9f4] p-2 text-[#0d0f1c]"
              required
            />
          </div>

          {/* Event Banner */}
          <div className="p-4">
            <div className="flex flex-col items-stretch rounded-xl xl:flex-row xl:items-start">
              <div className="flex w-full min-w-72 grow flex-col justify-center gap-1 py-4 xl:px-4">
                <p className="text-lg font-bold tracking-[-0.015em] text-[#0d0f1c]">
                  Event Banner
                </p>
                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-normal text-[#47569e]">
                      Recommended size: 1280x720px
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 text-sm text-gray-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div
                className="aspect-video w-full rounded-xl bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${formData.bannerPreview || 'public/assets/NoBanner.png'})`}}
              ></div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <div className="flex px-4 py-3">
            <button type="submit" className="flex h-12 min-w-[84px] flex-1 items-center justify-center rounded-full bg-blue-600 px-5 text-base font-bold text-[#f8f9fc] hover:bg-blue-800" disabled={isLoading}>
              {isLoading?<span className='animate-spin'><Loader2></Loader2></span>:<span className="truncate">Create Event</span>}
            </button>
          </div>
          <div className="h-5 bg-[#f8f9fc]"></div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
