import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export default function ProfileSettings() {
  const originalSettings = {
    language: 'English',
    darkMode: false,
  };


  const [settings, setSettings] = useState(originalSettings);
  const [draftSettings, setDraftSettings] = useState(originalSettings);
  const [isEditing, setIsEditing] = useState(false);

  const toggleSwitch = (key) => {
    setDraftSettings({ ...draftSettings, [key]: !draftSettings[key] });
  };

  const handleInputChange = (e) => {
    setDraftSettings({ ...draftSettings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSettings(draftSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftSettings(settings);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-[#f8f9fc] text-[#0d0f1c]">
      <h3 className="text-lg font-bold px-4 pb-2 pt-4">Settings</h3>

      {/* Language */}
      <div className="flex items-center justify-between px-4 py-2">
        <p className="text-base">Language</p>
        {isEditing ? (
          <select
            name="language"
            className="border rounded px-2 py-1"
            value={draftSettings.language}
            onChange={handleInputChange}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
          </select>
        ) : (
          <p>{settings.language}</p>
        )}
      </div>

      {/* Dark Mode */}
      <div className="flex items-center justify-between px-4 py-2 pb-10">
        <p className="text-base">Dark Mode</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={draftSettings.darkMode}
            onChange={() => toggleSwitch('darkMode')}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
        </label>
      </div>

    </div>
  );
}
