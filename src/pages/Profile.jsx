import React, { useEffect, useState } from "react";
import ProfileSettings from "./admin/ProfileSetting";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { uploadProfileToCloudinary } from "../utils/uploadToCloudinary";

const Profile = () => {
  const { user } = useAuthStore();

  const originalProfile = user;

  const [profile, setProfile] = useState(originalProfile);
  const [draftProfile, setDraftProfile] = useState(originalProfile);
  const [selectedImg, setSelectedImg] = useState(user?.profilePic || "");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [isUpdatingProfile,setIsUpdatingProfile] = useState(false)

  const handleChange = (e) => {
    setDraftProfile({ ...draftProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setProfile(draftProfile);
    setIsEditing(false);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: draftProfile.name,
        email: draftProfile.email,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const userRef = doc(db, "users", user.uid);
        await uploadProfileToCloudinary(file);
        await updateDoc(userRef, { profilePic: base64Image });
        setSelectedImg(base64Image);
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      }
    };
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  useEffect(() => {
    setSelectedImg(user?.profilePic || "");
  }, [user?.profilePic]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 font-['Plus_Jakarta_Sans']">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 text-xl">←</Link>
          <h2 className="text-2xl font-bold text-gray-900  text-center flex-1 pr-5">Profile</h2>
        </div>

        <div className="flex flex-col items-center mt-2 mb-4">
          <div>
            <label htmlFor="avatar-upload">
              <div
                className="w-32 h-32 rounded-full bg-cover bg-center border cursor-pointer hover:opacity-90 transition"
                style={{
                  backgroundImage: `url(${selectedImg || "/assets/NoBanner.png"})`,
                }}
              />
            </label>

            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
        </div>
          
            <>
              <p className="text-3xl font-semibold text-gray-900">{profile.name}</p>
              <p className="text-lg text-gray-500">{profile.role}</p>
              <p className="text-lg text-gray-500">
                Joined{" "}
                {profile.createdAt?.seconds
                  ? getTimeSince(new Date(profile.createdAt.seconds * 1000))
                  : "N/A"}
              </p>
            </>
        </div>

        <div className="space-y-4 mb-6">
          {["email"].map((field) => (
            <div key={field} className="flex justify-between items-center border-b pb-2">
              <p className="text-gray-700 capitalize">{field}</p>
                <p className="text-gray-800 text-right">{profile[field]}</p>
            </div>
          ))}

          <div className="flex justify-between items-center border-b pb-2">
            <p className="text-gray-700">Password</p>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Change
            </button>
          </div>
        </div>

        <div className="mt-8">
          <ProfileSettings />
        </div>
      </div>
    </div>
  );
};

function getTimeSince(date) {
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year(s) ago`;
  if (months > 0) return `${months} month(s) ago`;
  if (days > 0) return `${days} day(s) ago`;
  if (hours > 0) return `${hours} hour(s) ago`;
  if (mins > 0) return `${mins} minute(s) ago`;
  return "Just now";
}

export default Profile;

