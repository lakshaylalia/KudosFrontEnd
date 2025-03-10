"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Award, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import SideBarComp from '@/components/SideBarComp';
import Link from 'next/link';
import { useRouter } from "next/navigation";


interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees: number;
  status: 'upcoming' | 'active';
  featured?: boolean;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active'>('all');
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://kudos-backend-idtg.onrender.com/events/get-all-events");
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const res2 = await res.json();
        console.log("Fetched data:", res2.data);  // <-- Check this output
        setEvents(res2.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert(`Failed to fetch events: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };



    fetchEvents();
  }, []);

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => event.status === filter);

  const featuredEvents = events.filter(event => event.featured);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const router = useRouter();

  const addEvent = async (eventId: number) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    const userEmail = userData?.email;

    console.log("User Email from Local Storage:", userEmail);
    console.log("Event ID:", eventId);
    console.log("Token:", token);

    if (!token) {
      alert("Please login to register for events!");
      router.push("/login");
      return;
    }

    try {
      setRegistered(true);

      const requestBody = JSON.stringify({
        email: userEmail,
        eventId: eventId
      });

      console.log("Request Body:", requestBody);

      const response = await fetch(
        "https://kudos-backend-idtg.onrender.com/employee/register-event",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBody,
        }
      );

      const data = await response.json();

      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        alert("Registered successfully!");
      } else {
        alert("Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    } finally {
      setRegistered(false);
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <SideBarComp />
      <div className="min-h-screen bg-gray-50 overflow-y-scroll">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#1A237E] via-[#1565C0] to-[#42A5F5] text-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Kudos</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Don&apos;t just scroll—show up!
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="#all-events"
                  className={`py-2 px-5 md:px-6 md:py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'all' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('all')}
                >
                  All Events
                </Link>
                <Link
                  href="#all-events"
                  className={`py-2 px-5 md:px-6 md:py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'upcoming' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming
                </Link>
                <Link
                  href="#all-events"
                  className={`py-2 px-5 md:px-6 md:py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'active' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </Link>
              </div>
            </div>
          </div>
        </header>


        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
                <Link href="#all-events" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  View all events <ChevronRight size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-64 md:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {event.status === 'upcoming' ? 'Upcoming' : 'Active'}
                          </span>
                          <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Clock size={16} className="mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin size={16} className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-2" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" onClick={() => addEvent(event.id)}>
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Events Section */}
        <section id="all-events" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {filter === 'all' ? 'All Events' : filter === 'upcoming' ? 'Upcoming Events' : 'Active Events'}
            </h2>

            {loading ?
              <section className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
                    <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(2)].map((_, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-2/5 h-64 md:h-auto bg-gray-300 animate-pulse"></div>
                        <div className="md:w-3/5 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="w-16 h-5 bg-gray-300 animate-pulse rounded"></div>
                              <div className="w-16 h-5 bg-gray-300 animate-pulse rounded ml-2"></div>
                            </div>
                            <div className="w-48 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                            <div className="w-32 h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
                            <div className="w-40 h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
                            <div className="w-28 h-4 bg-gray-300 animate-pulse rounded"></div>
                          </div>
                          <div className="mt-4 w-full h-10 bg-gray-300 animate-pulse rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                      <div className="h-48 relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {event.status === 'upcoming' ? 'Upcoming' : 'Active'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-3 inline-block">
                          {event.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Clock size={16} className="mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin size={16} className="mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users size={16} className="mr-2" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      <div className="px-6 pb-6">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" onClick={() => addEvent(event.id)}>
                          {event.status === "active" ? "Register Now" : "View Details"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>

        {/* About Kudos Section */}
        <section className="py-12 md:py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Kudos?</h2>
              <p className="text-lg text-gray-700 mb-8">
                Kudos is a premier event discovery and management platform that connects people with exciting events happening in their community.
                Whether you&apos;re looking for concerts, workshops, conferences, or social gatherings, Kudos helps you find and participate in events
                that match your interests.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar size={24} className="text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Discover Events</h3>
                  <p className="text-gray-700">Find events that match your interests and schedule</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={24} className="text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Join Communities</h3>
                  <p className="text-gray-700">Connect with like-minded people who share your passions</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Host Events</h3>
                  <p className="text-gray-700">Create and manage your own events with powerful tools</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </div>
  );
}

export default App;