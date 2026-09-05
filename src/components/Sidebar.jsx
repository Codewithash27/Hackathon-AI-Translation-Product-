import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { classNames } from '../utils/helpers';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();

  const isTeacher = user?.role === 'Teacher';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Classes', href: '/classes', icon: '🏫' },
    { name: 'Lessons', href: '/lessons', icon: '📚' },
  ];

  if (isTeacher) {
    navigation.push(
      { name: 'Translations', href: '/translations', icon: '🌐' },
      { name: 'Terminology', href: '/terminology', icon: '📖' }
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div className={classNames(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-indigo-600">
            <span className="text-white text-xl font-bold tracking-tight">B4One <span className="font-light">Class</span></span>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => classNames(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 truncate">{user?.name}</p>
                <p className="text-xs font-medium text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
