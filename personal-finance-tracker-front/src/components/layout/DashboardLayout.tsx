import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={onLogout} />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {/* The content of the dashboard */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
