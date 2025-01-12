import React, { useState } from 'react';
import { AlertTriangle, Activity } from 'lucide-react';

export function AccountSection() {
  const [isAccountDeactivated, setIsAccountDeactivated] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [activity, setActivity] = useState<string[]>([]); // Explicit type declaration for activity

  const handleViewActivity = () => {
    // Simulate fetching account activity, here you could fetch real data via API
    setActivity([
      'Logged in from IP address 192.168.0.1',
      'Password change on 2024-12-01',
      'Two-Factor Authentication enabled on 2024-12-02',
    ]);
    alert('Viewing account activity...');
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account?')) {
      // Simulate deactivating the account, here you could call an API to deactivate the account
      setIsAccountDeactivated(true);
      alert('Account deactivated.');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('This action is irreversible. Are you sure you want to delete your account?')) {
      // Simulate deleting the account, here you could call an API to delete the account
      setIsAccountDeleted(true);
      alert('Account deleted.');
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Account Management</h2>

      <div className="space-y-4">
        {/* View Account Activity */}
        <button
          onClick={handleViewActivity}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="View Account Activity"
        >
          <Activity className="w-5 h-5 mr-2" />
          View Account Activity
        </button>

        {/* Display Activity */}
        {activity.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Recent Account Activity</h3>
            <ul className="space-y-2 mt-2">
              {activity.map((entry, index) => (
                <li key={index} className="text-sm text-gray-700">{entry}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {/* Deactivate Account */}
          <button
            onClick={handleDeactivateAccount}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label="Deactivate Account"
            disabled={isAccountDeactivated}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            {isAccountDeactivated ? 'Account Deactivated' : 'Deactivate Account'}
          </button>

          {/* Delete Account */}
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Delete Account"
            disabled={isAccountDeleted}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            {isAccountDeleted ? 'Account Deleted' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
