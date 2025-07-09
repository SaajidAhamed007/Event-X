import React from 'react';

const OrganizerProfile = () => {

    const organizer={
name: "Jane Doe",
role: "Event Organizer",
joinedYear: "2022",
email: "jane@example.com",
phone: "+91 98765 43210",
location: "Chennai, India",
imageURL: "https://example.com/profile.jpg",
bio: "Passionate about creating engaging and impactful tech events for students."
}

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 font-['Plus Jakarta Sans','Noto Sans',sans-serif]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="bg-center bg-cover bg-no-repeat rounded-full w-32 h-32"
          style={{ backgroundImage: `url(${organizer.imageURL})` }}
        ></div>
        <div className="text-center">
          <p className="text-[#0d0f1c] text-2xl font-bold">{organizer.name}</p>
          <p className="text-[#47579e] text-base">{organizer.role}</p>
          <p className="text-[#47579e] text-base">Organizer since {organizer.joinedYear}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <p className="text-[#0d0f1c] font-medium">Email</p>
          <p className="text-[#47579e]">{organizer.email}</p>
        </div>
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <p className="text-[#0d0f1c] font-medium">Phone</p>
          <p className="text-[#47579e]">{organizer.phone}</p>
        </div>
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <p className="text-[#0d0f1c] font-medium">Location</p>
          <p className="text-[#47579e]">{organizer.location}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-[#0d0f1c] font-medium mb-2">About</p>
          <p className="text-[#47579e] text-sm leading-relaxed">{organizer.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;


