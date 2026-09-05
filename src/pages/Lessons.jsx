import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLessons } from '../services/mockService';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import LessonCard from '../components/LessonCard';

export default function Lessons() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const isTeacher = user?.role === 'Teacher';

  useEffect(() => {
    async function loadData() {
      let allLessons = await getLessons();
      if (!isTeacher) {
        allLessons = allLessons.filter(l => l.status === 'Published');
      }
      setLessons(allLessons);
      setLoading(false);
    }
    loadData();
  }, [isTeacher]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center pb-5 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            All Lessons
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Browse all available lessons across classes.
          </p>
        </div>
        {isTeacher && (
          <Link
            to="/lessons/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Lesson
          </Link>
        )}
      </div>

      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              to={`/lessons/${lesson.id}`} 
              teacherView={isTeacher} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons available</h3>
        </div>
      )}
    </div>
  );
}
