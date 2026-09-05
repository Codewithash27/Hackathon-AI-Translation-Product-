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
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:text-4xl">
            <span className="gradient-text">Classes</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Select a class to view its subjects and lessons.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c, index) => (
          <Link 
            key={c.id} 
            to={`/classes/${c.id}`} 
            className="block group animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="premium-card-light overflow-hidden h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wide mb-1">Grade</p>
                    <div className="text-4xl font-bold group-hover:scale-110 transition-transform">
                      {c.grade}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                    👥 {c.totalStudents}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                  {c.name}
                </h3>
                
                <p className="text-sm text-gray-600 flex-grow mb-4">
                  {c.description}
                </p>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    📚 {c.totalSubjects} Subjects
                  </span>
                  <span className="flex items-center font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    View <span aria-hidden="true" className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
