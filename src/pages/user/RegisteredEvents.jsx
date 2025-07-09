import React from "react";
import { ArrowLeft, Home, Video, Calendar, User, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const RegisteredEvents = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-2xl p-4 grid gap-6 sm:grid-cols-1 xl:grid-cols-3">
        {/* Upcoming Events Section */}
        <h2 className="text-[#0f111a] text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
          Upcoming Events
        </h2>

        {/* Event Cards */}
        {[
          {
            title: "Building Engaging Online Courses",
            date: "August 5, 2024 · 11:00 AM - 12:00 PM",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuASUBkqxyGl-W2uaQ9z1CJHhEb7kTc7l0EvC8jyfpxGdCF60qPM-q7L3f85FuyZ2cLbMhESosGwVD77jTqffEt3PXoD5oqoIORZbF7iEosyOMIz9AdsAjzjr4J2J22SNlykJBvSf_AionlgH7lqBnOESe3Ymsm0OOFhsSWsYXuYUfzXpRXQkZdY46KqcCEWMWOiaO8pG7smNpRcgaqfz1KFWiNNAw_DS5yw6tolQcCUbM8tUg3IbolBHT4PGCbXLlHxubAG4hEoRufS",
          },
          {
            title: "Effective Online Teaching Strategies",
            date: "July 20, 2024 · 2:00 PM - 3:30 PM",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAURnu1Qz2O2egxDpILC7Gt6tUpeNd_ZCz60NPfX6ksyR4jApGtHCorDzoFc4I9TSRziBryZzMx-DA_eA48tpZA4qJtwBQHZt8mzh3xmoAK7jxKuqSvZlIvt-y_aQT6VjC7ag5XUbksVft4bBUMd6kNsHu31_NIBCgEPl_7opBdI0JZC0Q7cpIm_dVTFitJUSwdH4ABGm_aVAQONTqknB0XthSoGOHWe7B18TCQGNWx8UbCa4Ejc65srp9X3nC2eLlhHhGNuVC37rTJ",
          },
          {
            title: "AI in Education: Trends and Tools",
            date: "July 15, 2024 · 10:00 AM - 11:00 AM",
            image:
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAlR3JoD1I8kqDTFlDAsxttjTgrR6tO4-OXK3JHPxUtjJlizWV9nwJ3RE5lsuNSMheFsh-asFJo1msbjTg1GIAy-t3luO5JWBsOJiU4QATurGJ5xEe9lAiboYK2VJF-AFHXPkIgeQGQgqEV66iztHRMTFalP1SyWwkdj7hAh1DVIejnWXuKCVlIfxHJctBiPyeXwiv6CqJ4fZH03t-jqm6kUy1hku64GuxnL24acXi-arB-2RPS5L2H9wBfGUAL8AN1YBfwrpOtYdrg",
          },
        ].map((event, index) => (
          <div key={index} className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div
              className="w-full aspect-video bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
              ></div>
              <div className='flex justify-between'>
                  <div className="flex flex-col justify-center gap-1 p-4 w-full">
                      <p className="text-[#0e141b] text-lg font-bold tracking-[-0.015em]">{event.title}</p>
                      <p className="text-[#4e7397] text-base">{event.date}</p>
                      <p className="text-[#4e7397] text-base">{event.date}</p>
                  </div>

                  <div className='flex gap-2 items-center pr-3'>
                      <Link to={`/event`}>
                      <button className="flex items-center gap-1 h-8 px-4 bg-[#e6e9f4] text-sm font-medium rounded-full text-[#0d0f1c]">
                          <Eye size={18} /> View
                      </button>
                      </Link>
                  </div>
              </div>
          </div>
        ))}

        <div className="flex px-4 py-3 justify-end">
          <button className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e9eaf2] text-[#0f111a] text-sm font-bold">
            <span className="truncate">View All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredEvents;
