import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDashboardStats } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats(user.role).then(data => {
      setStats(data);
      setLoading(false);
    });
  }, [user.role]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;

  const isTeacher = user.role === 'Teacher';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Welcome back, {user.name}!
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening in your {isTeacher ? 'classes' : 'courses'} today.
        </p>
      </div>
      
      {/* Visual flow demo for Hackathon */}
      {isTeacher && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 shadow-sm">
          <h3 className="text-sm font-semibold text-indigo-800 uppercase tracking-wider mb-4">Innovation Workflow</h3>
          <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4">
            <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">📝</div>
              <div className="text-xs font-medium text-gray-700">English Lesson</div>
            </div>
            <div className="hidden md:block text-indigo-300">➔</div>
            <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">🤖</div>
              <div className="text-xs font-medium text-gray-700">AI Translation</div>
            </div>
            <div className="hidden md:block text-indigo-300">➔</div>
            <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">!</div>
              <div className="text-2xl mb-1">🔍</div>
              <div className="text-xs font-medium text-gray-700">Terminology Check</div>
            </div>
            <div className="hidden md:block text-indigo-300">➔</div>
            <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">1</div>
              <div className="text-2xl mb-1">👨‍🏫</div>
              <div className="text-xs font-medium text-gray-700">Teacher Review</div>
            </div>
            <div className="hidden md:block text-indigo-300">➔</div>
            <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">🌍</div>
              <div className="text-xs font-medium text-gray-700">Student Learning</div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isTeacher ? (
          <>
            <StatCard title="Total Classes" value={stats.totalClasses} icon="🏫" color="indigo" />
            <StatCard title="Total Lessons" value={stats.totalLessons} icon="📚" color="emerald" />
            <StatCard title="Pending Review" value={stats.pendingReview} icon="⏳" color="amber" />
            <StatCard title="Published Translations" value={stats.published} icon="✅" color="blue" />
          </>
        ) : (
          <>
            <StatCard title="Available Classes" value={stats.availableClasses} icon="🏫" color="indigo" />
            <StatCard title="Subjects" value={stats.totalSubjects} icon="🔬" color="emerald" />
            <StatCard title="Published Lessons" value={stats.publishedLessons} icon="📚" color="blue" />
            <StatCard title="Current Language" value={stats.currentLanguage} icon="🌐" color="purple" />
          </>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {stats.recentActivity.map((activity) => (
            <li key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-2xl">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.target}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <div className={`overflow-hidden rounded-lg border shadow-sm ${colorMap[color]} p-5 transition-transform hover:-translate-y-1`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 text-3xl mr-4">{icon}</div>
        <div>
          <div className="text-sm font-medium truncate opacity-80">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}
