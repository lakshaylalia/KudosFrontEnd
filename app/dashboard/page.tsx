"use client";

import React, { useContext } from "react";
import { Calendar, Users, Activity, DollarSign, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useKudosContext } from "@/context/KudosContext";
import KudosDonutChart from "@/components/ui/DonutChart";
import SideBarComp from "@/components/SideBarComp";

interface Event {
  id: number;
  title: string;
  date: string;
  attendees: number;
  status: "upcoming" | "active" | "completed";
}

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const { kudos } = useKudosContext();
  const router = useRouter();

  const stats = {
    totalEvents: 156,
    activeEvents: 23,
    participatedEvents: 50,
    Kudos: kudos,
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
      <SideBarComp />
      <div className="flex-1 px-6 py-6">
        <div className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center bg-white shadow-sm p-6 rounded-lg">
            <h1 className="text-lg md:text-3xl font-bold text-gray-900">Kudos Dashboard</h1>
            <div className="flex items-center space-x-6">
              <button className="flex items-center text-red-600 font-medium  transition px-4 py-2 border border-red-600 rounded-lg hover:bg-red-500 hover:text-white hover:font-semibold cursor-pointer" onClick={handleLogout}>
                <LogOut className="w-3 h-3 mr-1 md:w-5 md:h-5 md:mr-2" /> Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[['Total Events', stats.totalEvents, Calendar, 'indigo'],
            ['Active Events', stats.activeEvents, Activity, 'green'],
            ['Total Participated Events', stats.participatedEvents, Users, 'blue'],
            ['Available Kudos', stats.Kudos, DollarSign, 'purple']]
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
              <div style={{ width: '100%', height: '400px' }}> {/* Set the width and height */}
                <KudosDonutChart kudosData={[50, stats.completedEvents, stats.Kudos ?? 0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
