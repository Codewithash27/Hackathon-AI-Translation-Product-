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
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-gray-900">
          Welcome back, <span className="gradient-text">{user.name}!</span>
        </h2>
        <p className="text-lg text-gray-600">
          {isTeacher 
            ? "Here's what's happening in your classes today." 
            : "Here's your learning progress for today."}
        </p>
      </div>
      
      {/* Visual flow demo for Hackathon */}
      {isTeacher && (
        <div className="premium-card-light p-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
          <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-6 relative z-10">🚀 Innovation Workflow</h3>
          <div className="flex flex-col md:flex-row items-center justify-between text-center gap-4 relative z-10">
            <WorkflowStep icon="📝" label="English Lesson" />
            <ArrowDivider />
            <WorkflowStep icon="🤖" label="AI Translation" />
            <ArrowDivider />
            <WorkflowStep icon="🔍" label="Terminology Check" notification="!" notificationColor="red" />
            <ArrowDivider />
            <WorkflowStep icon="👨‍🏫" label="Teacher Review" notification="1" notificationColor="blue" />
            <ArrowDivider />
            <WorkflowStep icon="🌍" label="Student Learning" />
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <div className="premium-card-light overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-lg leading-6 font-bold text-gray-900 flex items-center">
            <span className="text-2xl mr-3">⚡</span>
            Recent Activity
          </h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {stats.recentActivity.map((activity, index) => (
            <li 
              key={activity.id} 
              className="px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50 to-purple-50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-3xl">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.target}
                  </p>
                </div>
                <div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {activity.time}
                  </span>
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
    indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-200 text-indigo-700 shadow-indigo-500/10',
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-200 text-emerald-700 shadow-emerald-500/10',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-200 text-amber-700 shadow-amber-500/10',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-200 text-blue-700 shadow-blue-500/10',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-200 text-purple-700 shadow-purple-500/10',
  };

  const gradientMap = {
    indigo: 'from-indigo-600 to-indigo-700',
    emerald: 'from-emerald-600 to-green-700',
    amber: 'from-amber-600 to-orange-700',
    blue: 'from-blue-600 to-cyan-700',
    purple: 'from-purple-600 to-pink-700',
  };

  return (
    <div className={`premium-card-light overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-slide-in`}>
      <div className={`bg-gradient-to-br ${gradientMap[color]} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="text-4xl">{icon}</div>
          <div className="text-right">
            <p className="text-xs font-semibold opacity-80 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold mt-1 group-hover:scale-110 transition-transform">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ icon, label, notification, notificationColor }) {
  return (
    <div className="flex-1 relative">
      <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-gray-100 hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
        {notification && (
          <div className={`absolute -top-3 -right-3 bg-${notificationColor}-500 text-white text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg`}>
            {notification}
          </div>
        )}
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

function ArrowDivider() {
  return (
    <div className="hidden md:flex text-2xl text-indigo-300 font-light">→</div>
  );
}
