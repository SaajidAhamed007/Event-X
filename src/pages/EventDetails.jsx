import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEventStore } from "../stores/useEventStore";
import { ArrowBigLeft, ArrowLeft, Trash } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";


const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  
  const { selectedEvent,getEventById, updateEvent,deleteEvent,registerForAnEvent } = useEventStore();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(()=>{
    getEventById(id)
  },[id])

  useEffect(() => {
    if (selectedEvent) {
      setForm({
        title: selectedEvent.title || "",
        location: selectedEvent.location || "",
        time: selectedEvent.date ? selectedEvent.date.toDate().toLocaleTimeString() : "",
        date: selectedEvent.date ? selectedEvent.date.toDate().toLocaleDateString() : "",
        level: selectedEvent.level || "",
        type: selectedEvent.type || "",
        format: selectedEvent.format || "",
      });
    }
  }, [selectedEvent]);
  const event = selectedEvent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const HandleDelete = (id) => {
    deleteEvent(id)
    navigate("/")
  };

  const handleSave = async () => {
    const dateTime = new Date(`${form.date}T${form.time}`);
    const updatedData = {
      ...form,
      date:dateTime
    }
    await updateEvent(id,updatedData)
    console.log("Saved Data:", form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      title: event?.title,
      location: event?.location,
      time: event?.date.toDate().toLocaleTimeString(),
      date: event?.date.toDate().toLocaleDateString(),
      level: event?.level,
      type: event?.type,
      format: event?.format,
    });
    setIsEditing(false);
  };

  if(!event || !form) return <h1>No event</h1>

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 pt-0 font-['Plus Jakarta Sans']">

          {/* Back Button */}
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600">
              <ArrowLeft className="mr-2" />
              Back
            </Link>
          </div>

          {/* Banner */}
            <div
              className="aspect-[3/2] bg-cover bg-center rounded-xl border border-gray-300"
              style={{ backgroundImage: `url(${event.bannerURL})` }}
            />

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mt-6">
            {isEditing ? (
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-2 border border-gray-300 px-4 py-2 rounded text-center text-xl"
                placeholder="Event Title"
              />
            ) : (
              form.title
            )}
          </h1>

          {/* Info Table */}
          <div className="mt-6 flex items-center justify-center">
            <table className="w-2xl mt-6 text-sm text-gray-800 border-separate border-spacing-y-3 text-center">
              <tbody>
                {["Location", "Time", "Date", "Level", "Type", "Format"].map((label) => {
                  const key = label.toLowerCase();
                  return (
                    <tr key={key}>
                      <td className=" text-gray-500 font-medium">{label}</td>
                      <td>
                        {isEditing ? (
                          <input
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                          />
                        ) : (
                          <span>{form[key]}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-8 max-w-md mx-auto">
            {user.role === "organizer" ? (
              isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/event/${event.id}/registrants`}
                    className="w-full sm:w-auto flex-1 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold flex items-center justify-center"
                  >
                    Registrants
                  </Link>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto flex-1 h-12 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => HandleDelete(event.id)}
                    className="w-full sm:w-auto flex-1 h-12 rounded-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              )
            ) : (
              <button
                onClick={() => registerForAnEvent(user)}
                className="w-full h-12 rounded-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold"
              >
                Register
              </button>
            )}
          </div>

        </div>
      </div>
  );
};

export default EventDetails;

