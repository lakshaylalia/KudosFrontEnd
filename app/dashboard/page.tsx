"use client";

import React, { useContext } from "react";
import SideBarDash from "@/components/SideBarDash";
import {
  BarChart3, Calendar, Clock, Users, TrendingUp, Activity, DollarSign, CheckCircle, Search, LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

interface Event {
  id: number;
  title: string;
  date: string;
  attendees: number;
  status: "upcoming" | "active" | "completed";
}

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const stats = {
    totalEvents: 156,
    activeEvents: 23,
    totalAttendees: 12450,
    revenue: 89750,
    upcomingEvents: 45,
    completedEvents: 88,
    averageRating: 4.8,
    ticketsSold: 15680,
  };

  const recentEvents: Event[] = [
    { id: 1, title: "Tech Conference 2025", date: "2025-03-15", attendees: 450, status: "upcoming" },
    { id: 2, title: "Music Festival", date: "2025-02-20", attendees: 2800, status: "active" },
    { id: 3, title: "Charity Run", date: "2025-01-30", attendees: 650, status: "completed" },
    { id: 4, title: "Art Exhibition", date: "2025-02-05", attendees: 180, status: "active" },
  ];

  const handleLogout = async () => {
    try {
      if (!auth) throw new Error("Authentication service is unavailable.");
      await auth.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error instanceof Error ? error.message : error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SideBarDash />
      <div className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center bg-white shadow-sm p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900">Kudos Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="flex items-center text-red-600 font-medium hover:text-red-800 transition" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[['Total Events', stats.totalEvents, Calendar, 'indigo'],
            ['Active Events', stats.activeEvents, Activity, 'green'],
            ['Total Attendees', stats.totalAttendees.toLocaleString(), Users, 'blue'],
            ['Revenue', `$${stats.revenue.toLocaleString()}`, DollarSign, 'purple']]
            .map(([title, value, Icon, color]) => {
              const IconComponent = Icon as React.ElementType;
              return (
                <div key={title as string} className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{title as string}</p>
                    <p className="text-2xl font-bold text-gray-900">{typeof value === 'string' || typeof value === 'number' ? value : ''}</p>
                  </div>
                  <div className={`bg-${color}-100 p-3 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 text-${color}-600`} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Events</h2>
            <div className="divide-y divide-gray-200">
              {recentEvents.map(event => (
                <div key={event.id} className="py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['Upcoming Events', stats.upcomingEvents, Clock],
                ['Completed Events', stats.completedEvents, CheckCircle],
                ['Average Rating', stats.averageRating, BarChart3],
                ['Tickets Sold', stats.ticketsSold.toLocaleString(), TrendingUp]]
              .map(([title, value, Icon]) => {
                const IconComponent = Icon as React.ElementType;
                return (
                  <div key={title as string} className="border rounded-lg p-4 flex justify-between items-center">
                    <span className="text-sm text-gray-600">{typeof title === 'string' ? title : ''}</span>
                    <IconComponent className="w-4 h-4 text-gray-400" />
                    <p className="text-2xl font-bold text-gray-900">{typeof value === 'string' || typeof value === 'number' ? value : ''}</p>
                  </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
