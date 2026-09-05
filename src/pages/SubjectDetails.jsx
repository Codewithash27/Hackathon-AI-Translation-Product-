import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById, getChapters, getClassById } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SubjectDetails() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [classData, setClassData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const sub = await getSubjectById(subjectId);
      if (sub) {
        const cls = await getClassById(sub.classId);
        const chaps = await getChapters(subjectId);
        setSubject(sub);
        setClassData(cls);
        setChapters(chaps.sort((a, b) => a.order - b.order));
      }
      setLoading(false);
    }
    loadData();
  }, [subjectId]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!subject) return <div>Subject not found</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <nav className="text-sm text-gray-500 font-medium">
        <Link to="/classes" className="hover:text-gray-900">Classes</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/classes/${classData?.id}`} className="hover:text-gray-900">{classData?.name}</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{subject.name}</span>
      </nav>

      <div className="flex items-center space-x-4 mb-6">
        <div className="text-4xl">{subject.icon}</div>
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {subject.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {chapters.length} Chapters
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/chapters/${chapter.id}`} className="block hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 sm:px-6 flex items-center">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">
                          Chapter {chapter.order}: {chapter.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex overflow-hidden -space-x-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {chapter.totalLessons} Lessons
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
