"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Award,
  BugIcon,
  Sparkles,
  WrenchIcon ,
} from "lucide-react";
import { motion } from "framer-motion";
import SideBarComp from "@/components/SideBarComp";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

interface Ticket {
  id: number;
  title: string;
  description: string;
  type: "bug" | "feature" | "improvement";
  status: "active" | "inactive" | "completed";
  createdAt: string;
  kudosReward: number;
  team: TeamMember[] | null;
  assignee?: TeamMember;
  priority: "low" | "medium" | "high";
}

const getPriorityColor = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "low":
      return "bg-green-200 text-green-800";
    case "medium":
      return "bg-yellow-200 text-yellow-800";
    case "high":
      return "bg-red-200 text-red-800";
    default:
      return "";
  }
};

const getStatusIcon = (status: "active" | "inactive" | "completed") => {
  switch (status) {
    case "active":
      return <span className="text-green-500">●</span>;
    case "inactive":
      return <span className="text-gray-500">●</span>;
    case "completed":
      return <span className="text-blue-500">●</span>;
    default:
      return null;
  }
};

const getTypeIcon = (type: "bug" | "feature" | "improvement") => {
  switch (type) {
    case "bug":
      return <BugIcon className="w-4 h-4 text-red-500" />;
    case "feature":
      return <Sparkles className="w-4 h-4 text-green-500" />;
    case "improvement":
      return <WrenchIcon  className="w-4 h-4 text-blue-500" />;
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Tickets: React.FC = () => {
  const [filters, setFilters] = useState({ status: "all", type: "all" });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setTickets([
        {
          id: 1,
          title: "Fix Authentication Bug",
          description: "Users are experiencing intermittent login failures. Need to investigate and fix the authentication flow.",
          type: "bug",
          status: "active",
          createdAt: "2025-01-09T10:00:00",
          kudosReward: 500,
          team: [
            { id: 1, name: "John Doe", role: "Lead Developer" },
            { id: 2, name: "Jane Smith", role: "Security Specialist" }
          ],
          priority: "high"
        },
        {
          id: 2,
          title: "Implement Dark Mode",
          description: "Add system-wide dark mode support with user preference persistence.",
          type: "feature",
          status: "active",
          createdAt: "2025-01-08T15:30:00",
          kudosReward: 800,
          team: null,
          assignee: { id: 3, name: "Mike Johnson", role: "UI Developer" },
          priority: "medium"
        },
        {
          id: 3,
          title: "Performance Optimization",
          description: "Improve application load time and overall performance through code optimization.",
          type: "improvement",
          status: "completed",
          createdAt: "2025-01-07T09:15:00",
          kudosReward: 600,
          team: [
            { id: 4, name: "Sarah Wilson", role: "Performance Engineer" },
            { id: 5, name: "Tom Brown", role: "Backend Developer" }
          ],
          priority: "high"
        },
        {
          id: 4,
          title: "Mobile Responsiveness",
          description: "Enhance mobile view compatibility across all pages.",
          type: "improvement",
          status: "inactive",
          createdAt: "2025-01-06T14:20:00",
          kudosReward: 400,
          team: null,
          assignee: { id: 6, name: "Lisa Anderson", role: "Frontend Developer" },
          priority: "low"
        },
        {
          id: 5,
          title: "Mobile Responsiveness",
          description: "Enhance mobile view compatibility across all pages.",
          type: "improvement",
          status: "inactive",
          createdAt: "2025-01-06T14:20:00",
          kudosReward: 400,
          team: null,
          assignee: { id: 6, name: "Lisa Anderson", role: "Frontend Developer" },
          priority: "low"
        },
        {
          id: 6,
          title: "Mobile Responsiveness",
          description: "Enhance mobile view compatibility across all pages.",
          type: "improvement",
          status: "inactive",
          createdAt: "2025-01-06T14:20:00",
          kudosReward: 400,
          team: null,
          assignee: { id: 6, name: "Lisa Anderson", role: "Frontend Developer" },
          priority: "medium"
        },
      ]);
      setLoading(false);
    }, 1000); // Simulate a 2-second API delay
  }, []);

  const updateFilter = (key: "status" | "type", value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch = filters.status === "all" || ticket.status === filters.status;
    const typeMatch = filters.type === "all" || ticket.type === filters.type;
    return statusMatch && typeMatch;
  });

  return (
    <section className="w-full h-screen flex">
      <SideBarComp />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 text-gray-900 px-8 py-16 relative overflow-y-scroll"
      >
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Tickets</h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage and track development tasks, bugs, and improvements
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex space-x-2">
              {["all", "active", "inactive", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateFilter("status", status)}
                  className={`px-4 py-2 rounded-lg transition-all ${filters.status === status ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              {["all", "bug", "feature", "improvement"].map((type) => (
                <button
                  key={type}
                  onClick={() => updateFilter("type", type)}
                  className={`px-4 py-2 rounded-lg transition-all ${filters.type === type ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
                    }`}
                >
                  {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Skeleton Loader */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(ticket.type)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </div>
                    {getStatusIcon(ticket.status)}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ticket.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(ticket.createdAt)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {ticket.team ? `${ticket.team.length} team members` : '1 assignee'}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Award className="w-4 h-4 mr-2" />
                      {ticket.kudosReward} kudos reward
                    </div>
                  </div>

                  {ticket.team && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Team Members:</p>
                      <div className="space-y-2">
                        {ticket.team.map((member) => (
                          <div key={member.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-900">{member.name}</span>
                            <span className="text-gray-500">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ticket.assignee && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Assignee:</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-900">{ticket.assignee.name}</span>
                        <span className="text-gray-500">{ticket.assignee.role}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
    </div>
      </motion.div >
    </section >
  );
};

export default Tickets;
