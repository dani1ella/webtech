import React, { useState } from 'react';
import { Moon, Bell } from 'lucide-react';

export function PreferencesSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [dashboardView, setDashboardView] = useState('Overview');

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
    alert(`Dark mode ${!isDarkMode ? 'enabled' : 'disabled'}`);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsEnabled((prev) => !prev);
    alert(`Notifications ${!isNotificationsEnabled ? 'enabled' : 'disabled'}`);
  };

  const handleDashboardViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDashboardView(e.target.value);
    alert(`Dashboard view changed to ${e.target.value}`);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Preferences</h2>

      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Moon className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isNotificationsEnabled}
              onChange={handleNotificationsToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Default Dashboard View Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Default Dashboard View
          </label>
          <select
            value={dashboardView}
            onChange={handleDashboardViewChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>Overview</option>
            <option>Income Tracker</option>
            <option>Expense Tracker</option>
          </select>
        </div>
      </div>
    </div>
  );
}
