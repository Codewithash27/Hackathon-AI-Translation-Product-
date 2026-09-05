import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/helpers';

export default function LessonCard({ lesson, to, teacherView = false }) {
  return (
    <Link to={to} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {lesson.title}
          </h3>
          {teacherView && <StatusBadge status={lesson.status} />}
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
          {lesson.content}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
          <span>Created: {formatDate(lesson.createdAt)}</span>
          <span className="flex items-center">
            View details
            <svg className="ml-1 w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
