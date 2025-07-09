import React, { useState } from "react";
import ProfileSettings from "./admin/ProfileSetting";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const Profile = () => {

  const {user} = useAuthStore()

  const originalProfile = user;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(originalProfile);
  const [draftProfile, setDraftProfile] = useState(originalProfile);

  const handleChange = (e) => {
    setDraftProfile({ ...draftProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(draftProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 font-['Plus_Jakarta_Sans']">

        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 text-xl">
            ←
          </Link>
          <h2 className="text-xl font-bold text-gray-900 text-center flex-1 pr-5">
            Profile
          </h2>
        </div>


        <div className="flex flex-col items-center gap-3 mb-6">
          <div
            className="w-32 h-32 rounded-full bg-cover bg-center border"
            style={{
              backgroundImage: `url(${originalProfile.BannerUrl})`
            }}
          />
          {isEditing ? (
            <input
              className="text-center border px-3 py-1 rounded w-full max-w-xs"
              name="name"
              value={draftProfile.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          ) : (
            <>
              <p className="text-xl font-semibold text-gray-900">{profile.name}</p>
              <p className="text-sm text-gray-500">{profile.role}</p>
              <p className="text-sm text-gray-500">Joined {profile.joined}</p>
            </>
          )}
        </div>


        <div className="space-y-4 mb-6">
          {["email"].map((field) => (
            <div key={field} className="flex justify-between items-center border-b pb-2">
              <p className="text-gray-700 capitalize">{field}</p>
              {isEditing ? (
                <input
                  className="border px-3 py-1 rounded w-2/3 text-right"
                  name={field}
                  value={draftProfile[field]}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-800 text-right">{profile[field]}</p>
              )}
            </div>
          ))}


          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Password</p>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Change
            </button>
          </div>
        </div>


        <div className="flex justify-center gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-full font-medium"
              >
                Cancel
              </button>
            </>
          )}
        </div>


        <div className="mt-8">
          <ProfileSettings />
        </div>
      </div>
    </div>
  );
};

export default Profile;

