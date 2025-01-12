import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { TwoFactorModal } from '../components/auth/TwoFactorModal';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface LoginPageProps {
  onLogin: () => void; // A callback function to handle login
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    try {
      // TODO: Implement actual API call
      console.log('Login attempt:', { email, password, remember });

      // After successful login, trigger the onLogin callback
      onLogin();
      
      // Show 2FA modal (if needed)
      setShowTwoFactor(true);
      setError(null);
    } catch {
      setError('Invalid email or password');
    }
  };

  const handleTwoFactorVerify = async (code: string) => {
    try {
      // TODO: Implement actual 2FA verification
      console.log('2FA verification:', code);
      setShowTwoFactor(false);
      setError(null);
    } catch {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wallet className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Signup Here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} />

          <TwoFactorModal
            isOpen={showTwoFactor}
            onClose={() => setShowTwoFactor(false)}
            onVerify={handleTwoFactorVerify}
          />
        </div>
      </div>
    </div>
  );
}
