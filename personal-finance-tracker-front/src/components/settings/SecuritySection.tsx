import React, { useState } from 'react';
import { Shield, LogOut, Lock } from 'lucide-react';

export function SecuritySection() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Laptop', lastActive: '2024-12-01 14:00' },
    { id: 2, device: 'Mobile', lastActive: '2024-12-03 18:30' },
  ]);
  const [showSessionsModal, setShowSessionsModal] = useState(false);

  const enable2FA = () => {
    // Implement the logic to enable 2FA (e.g., call an API)
    setIs2FAEnabled(true);
    alert('Two-Factor Authentication enabled!');
  };

  const viewSessions = () => {
    setShowSessionsModal(true);
  };

  const closeSessionsModal = () => {
    setShowSessionsModal(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold flex items-center space-x-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <span>Security</span>
      </h2>

      <div className="space-y-4">
        {/* Two-Factor Authentication */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-600" />
              <span>Two-Factor Authentication</span>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add an extra layer of security to your account.
            </p>
          </div>
          <button
            className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            aria-label="Enable Two-Factor Authentication"
            onClick={enable2FA}
            disabled={is2FAEnabled} // Disable the button if 2FA is already enabled
          >
            {is2FAEnabled ? '2FA Enabled' : 'Enable 2FA'}
          </button>
        </div>

        {/* Active Sessions */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <LogOut className="w-5 h-5 text-gray-600" />
              <span>Active Sessions</span>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage your active sessions across devices.
            </p>
          </div>
          <button
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
            aria-label="View Active Sessions"
            onClick={viewSessions}
          >
            <LogOut className="w-4 h-4 mr-2" />
            View Sessions
          </button>
        </div>
      </div>

      {/* Sessions Modal */}
      {showSessionsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Active Sessions</h3>
            <ul>
              {activeSessions.map((session) => (
                <li key={session.id} className="flex justify-between items-center mb-2">
                  <span>{session.device}</span>
                  <span className="text-sm text-gray-500">{session.lastActive}</span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={closeSessionsModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
