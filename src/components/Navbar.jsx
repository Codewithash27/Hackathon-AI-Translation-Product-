import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

export default function Navbar({ onMenuClick }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-ml-2 p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop title / Search placeholder */}
        <div className="flex-1 flex justify-between px-4 sm:px-0">
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 hidden lg:block">
              {user?.role === 'Teacher' ? 'Teacher Dashboard' : 'Student Portal'}
            </h1>
          </div>
          
          <div className="ml-4 flex items-center md:ml-6 space-x-4">
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
