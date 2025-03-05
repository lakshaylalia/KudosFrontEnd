"use client";
import React from "react";
import SideBarDash from "@/components/SideBarDash";
import { BarChart3, Calendar, Clock, Users, TrendingUp, Activity, DollarSign, CheckCircle, Search, LogOut } from 'lucide-react';
import { useRouter } from "next/navigation";


interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalAttendees: number;
  revenue: number;
  upcomingEvents: number;
  completedEvents: number;
  averageRating: number;
  ticketsSold: number;
}

interface RecentEvent {
  id: number;
  title: string;
  date: string;
  attendees: number;
  status: 'upcoming' | 'active' | 'completed';
}

const Dashboard: React.FC = () => {
  const stats: DashboardStats = {
    totalEvents: 156,
    activeEvents: 23,
    totalAttendees: 12450,
    revenue: 89750,
    upcomingEvents: 45,
    completedEvents: 88,
    averageRating: 4.8,
    ticketsSold: 15680
  };

  const recentEvents: RecentEvent[] = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "2025-03-15",
      attendees: 450,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "2025-02-20",
      attendees: 2800,
      status: "active"
    },
    {
      id: 3,
      title: "Charity Run",
      date: "2025-01-30",
      attendees: 650,
      status: "completed"
    },
    {
      id: 4,
      title: "Art Exhibition",
      date: "2025-02-05",
      attendees: 180,
      status: "active"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    router.push("/login");
  };

  return (
    <div>
      <div className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Kudos Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button className="flex items-center text-red-600 font-medium hover:text-red-800" onClick={handleLogout}          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 flex">
        <SideBarDash />
        <div className="container mx-auto px-4 py-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your events.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeEvents}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAttendees.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Events */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Events</h2>
              <div className="divide-y divide-gray-200">
                {recentEvents.map((event) => (
                  <div key={event.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">
                          <Users className="w-4 h-4 inline mr-1" />
                          {event.attendees}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View all events →
              </button>
            </div>

            {/* Additional Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Upcoming Events</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Completed</span>
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedEvents}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Tickets Sold</span>
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.ticketsSold.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
