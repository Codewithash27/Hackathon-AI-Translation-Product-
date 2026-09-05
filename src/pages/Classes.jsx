import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClasses } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Classes
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a class to view its subjects and lessons.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Link key={c.id} to={`/classes/${c.id}`} className="block group">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl group-hover:scale-110 transition-transform">
                  {c.grade}
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {c.totalStudents} Students
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                {c.name}
              </h3>
              
              <p className="text-sm text-gray-500 flex-grow mb-4">
                {c.description}
              </p>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm font-medium text-indigo-600">
                <span>{c.totalSubjects} Subjects</span>
                <span className="flex items-center group-hover:translate-x-1 transition-transform">
                  View <span aria-hidden="true" className="ml-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
