import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export function LocalizationSection() {
  const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC (GMT+0)');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    alert(`Language changed to ${e.target.value}`);
  };

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(e.target.value);
    alert(`Time zone changed to ${e.target.value}`);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Globe className="w-6 h-6 text-blue-500" />
        Localization
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Language Selector */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        {/* Time Zone Selector */}
        <div>
          <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
            Time Zone
          </label>
          <select
            id="timeZone"
            value={timeZone}
            onChange={handleTimeZoneChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option>UTC (GMT+0)</option>
            <option>EST (GMT-5)</option>
            <option>PST (GMT-8)</option>
            <option>IST (GMT+5:30)</option>
          </select>
        </div>
      </div>

      {/* Display Selected Options */}
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Selected Language:</strong> {language}
        </p>
        <p>
          <strong>Selected Time Zone:</strong> {timeZone}
        </p>
      </div>
    </div>
  );
}
