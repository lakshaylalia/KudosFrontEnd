"use client";
import React, { useState } from 'react';
import { Bell, Home, Sun, Globe, Lock, UserCircle, Mail, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState('public');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Home className="w-5 h-5 mr-2" /> Go Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <nav className="space-y-2">
              <a href="#account" className="flex items-center px-4 py-2 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg">
                <UserCircle className="w-5 h-5 mr-3" />
                Account
              </a>
              <a href="#notifications" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </a>
              <a href="#appearance" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Sun className="w-5 h-5 mr-3" />
                Appearance
              </a>
              <a href="#privacy" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Lock className="w-5 h-5 mr-3" />
                Privacy
              </a>
              <a href="#language" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Globe className="w-5 h-5 mr-3" />
                Language
              </a>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-2">
            {/* Account Settings */}
            <div id="account" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div id="notifications" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your account activity</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`${emailNotifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div id="appearance" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode on or off</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`${darkMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
                  >
                    <span
                      className={`${darkMode ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
