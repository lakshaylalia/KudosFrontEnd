"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Award, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import SideBarComp from '@/components/SideBarComp';

// Types
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

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchEvents = async () => {
      setLoading(true);
      // In a real application, this would be an API call
      setTimeout(() => {
        setEvents([
          {
            id: 1,
            title: "Annual Tech Conference",
            date: "2025-03-15",
            time: "09:00 AM - 05:00 PM",
            location: "Convention Center, Downtown",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Technology",
            attendees: 1200,
            status: "upcoming",
            featured: true
          },
          {
            id: 2,
            title: "Music Festival",
            date: "2025-02-20",
            time: "04:00 PM - 11:00 PM",
            location: "City Park",
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Entertainment",
            attendees: 5000,
            status: "upcoming"
          },
          {
            id: 3,
            title: "Charity Run",
            date: "2025-01-30",
            time: "07:00 AM - 11:00 AM",
            location: "Riverside Park",
            image: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Sports",
            attendees: 800,
            status: "active",
            featured: true
          },
          {
            id: 4,
            title: "Art Exhibition",
            date: "2025-02-05",
            time: "10:00 AM - 06:00 PM",
            location: "Modern Art Gallery",
            image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Arts & Culture",
            attendees: 350,
            status: "active"
          },
          {
            id: 5,
            title: "Business Networking",
            date: "2025-03-10",
            time: "06:00 PM - 09:00 PM",
            location: "Grand Hotel",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Business",
            attendees: 200,
            status: "upcoming"
          },
          {
            id: 6,
            title: "Food & Wine Festival",
            date: "2025-02-15",
            time: "12:00 PM - 08:00 PM",
            location: "Central Plaza",
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            category: "Food & Drink",
            attendees: 1500,
            status: "active"
          }
        ]);
        setLoading(false);
      }, 1000);
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

  return (
    <div className='w-full h-screen flex'>
      <SideBarComp />
      <div className="min-h-screen bg-gray-50 overflow-y-scroll">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-400 text-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Kudos Events</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover and participate in the most exciting events happening around you
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className={`px-6 py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'all' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('all')}
                >
                  All Events
                </button>
                <button
                  className={`px-6 py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'upcoming' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`px-6 py-3 rounded-full font-medium shadow-md transition-all hover:scale-105 ${filter === 'active' ? 'bg-white text-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </button>
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
                <a href="#all-events" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  View all events <ChevronRight size={20} />
                </a>
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
                      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
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

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl text-gray-600">No events found</h3>
                <button
                  onClick={() => setFilter('all')}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  View All Events
                </button>
              </div>
            ) : (
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
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        View Details
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

        {/* Newsletter Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500 text-white bg-opacity-95 backdrop-blur-lg shadow-lg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 drop-shadow-lg">Stay Updated</h2>
              <p className="text-lg mb-8 opacity-90">
                Subscribe to our newsletter to get the latest updates on events and exclusive offers
              </p>
              <form className="flex flex-col md:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-5 py-3 rounded-lg text-gray-900 w-full md:w-auto md:flex-grow max-w-md focus:ring-2 focus:ring-blue-300 shadow-md"
                />
                <button
                  type="submit"
                  className="bg-white text-indigo-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;