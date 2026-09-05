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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar component */}
      <div className={classNames(
        'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-center h-20 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 backdrop-blur-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-white">B4</span>
              </div>
              <div>
                <span className="text-white text-lg font-bold tracking-tight">B4One</span>
                <div className="text-xs text-indigo-200 font-medium">Class</div>
              </div>
            </div>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => classNames(
                    'group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
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
          <div className="p-4 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 font-medium truncate">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
