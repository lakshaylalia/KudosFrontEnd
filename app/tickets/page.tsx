"use client";
import React, { useState } from 'react';
import { Clock, Users, Award, CheckCircle, XCircle, ArrowUpCircle, BugPlay, Sparkles, Wrench } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

interface Ticket {
  id: number;
  title: string;
  description: string;
  type: 'bug' | 'feature' | 'improvement';
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
  kudosReward: number;
  team: TeamMember[] | null;
  assignee?: TeamMember;
  priority: 'low' | 'medium' | 'high';
}

const Tickets: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'bug' | 'feature' | 'improvement'>('all');

  const tickets: Ticket[] = [
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
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <BugPlay className="w-5 h-5 text-red-500" />;
      case 'feature':
        return <Sparkles className="w-5 h-5 text-blue-500" />;
      case 'improvement':
        return <Wrench className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <ArrowUpCircle className="w-5 h-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filter === 'all' || ticket.status === filter;
    const typeMatch = typeFilter === 'all' || ticket.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600">Manage and track development tasks, bugs, and improvements</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-lg ${filter === 'inactive' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Inactive
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Completed
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-4 py-2 rounded-lg ${typeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              All Types
            </button>
            <button
              onClick={() => setTypeFilter('bug')}
              className={`px-4 py-2 rounded-lg ${typeFilter === 'bug' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Bugs
            </button>
            <button
              onClick={() => setTypeFilter('feature')}
              className={`px-4 py-2 rounded-lg ${typeFilter === 'feature' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Features
            </button>
            <button
              onClick={() => setTypeFilter('improvement')}
              className={`px-4 py-2 rounded-lg ${typeFilter === 'improvement' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
            >
              Improvements
            </button>
          </div>
        </div>

        {/* Tickets Grid */}
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
      </div>
    </div>
  );
};

export default Tickets;