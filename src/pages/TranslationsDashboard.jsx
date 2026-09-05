import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLessons, getTranslations } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';

export default function TranslationsDashboard() {
  const [lessons, setLessons] = useState([]);
  const [translationsMap, setTranslationsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const allLessons = await getLessons();
      const allTranslationsData = await Promise.all(
        allLessons.map(l => getTranslations(l.id))
      );
      
      const tMap = {};
      allLessons.forEach((lesson, i) => {
        tMap[lesson.id] = allTranslationsData[i];
      });

      setLessons(allLessons.sort((a, b) => b.id - a.id));
      setTranslationsMap(tMap);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center pb-5 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Translations Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a saved lesson to translate it into different languages.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {lessons.map((lesson) => {
            const trans = translationsMap[lesson.id] || [];
            return (
              <li key={lesson.id}>
                <Link to={`/lessons/${lesson.id}/translations`} className="block hover:bg-gray-50 transition-colors">
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {lesson.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex space-x-2">
                          <StatusBadge status={lesson.status} />
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex text-sm text-gray-500">
                          <p className="truncate max-w-lg">{lesson.content}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <p>
                            {trans.length} Translations
                          </p>
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
            );
          })}
        </ul>
        {lessons.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons saved yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}
