import React, { useState } from 'react';
import { ProfileSection } from './ProfileSection';
import { PreferencesSection } from './PreferencesSection';
import { SecuritySection } from './SecuritySection';
import { LocalizationSection } from './LocalizationSection';
import { AccountSection } from './AccountSection';
import { Save } from 'lucide-react';

export function SettingsLayout() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate saving process (you can replace this with your actual save logic)
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      console.log('Settings saved successfully');
    }, 2000); // Simulating a 2-second save process
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-900">Account Settings</h1>
          </div>

          <div className="px-8 py-6 space-y-12">
            <ProfileSection />
            <PreferencesSection />
            <SecuritySection />
            <LocalizationSection />
            <AccountSection />

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSaving ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                aria-label="Save changes"
              >
                {isSaving ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>

            {/* Display success message after saving */}
            {saveSuccess && (
              <div className="mt-4 text-center text-sm text-green-600">
                Settings saved successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
