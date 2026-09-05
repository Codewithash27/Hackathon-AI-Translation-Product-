import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLessonById, getTranslations } from '../services/mockService';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import LanguageSelector from '../components/LanguageSelector';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';

export default function LessonDetails() {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [currentLang, setCurrentLang] = useState('en');
  const [loading, setLoading] = useState(true);

  const isTeacher = user?.role === 'Teacher';

  useEffect(() => {
    async function loadData() {
      const les = await getLessonById(lessonId);
      if (les) {
        const trans = await getTranslations(lessonId);
        setLesson(les);
        setTranslations(trans);
      }
      setLoading(false);
    }
    loadData();
  }, [lessonId]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!lesson) return <div>Lesson not found</div>;

  // Get active content based on selected language
  let activeTitle = lesson.title;
  let activeContent = lesson.content;
  
  if (currentLang !== 'en') {
    // Only students see Published, Teachers see anything
    const availableTranslations = isTeacher 
      ? translations 
      : translations.filter(t => t.status === 'Published');
      
    const translation = availableTranslations.find(t => t.language === currentLang);
    
    if (translation) {
      activeTitle = translation.translatedTitle;
      activeContent = translation.translatedContent;
    } else {
      activeTitle = `(Not translated to selected language)`;
      activeContent = `This lesson has not been translated to the selected language yet. Showing English version:\n\n${lesson.content}`;
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <nav className="text-sm text-gray-500 font-medium whitespace-nowrap overflow-x-auto pb-2">
        <Link to={`/chapters/${lesson.chapterId}`} className="hover:text-gray-900">Back to Chapter</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Lesson {lesson.id}</span>
      </nav>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg leading-6 font-bold text-gray-900 uppercase tracking-wider text-xs">
                Language
              </h3>
            </div>
            <LanguageSelector 
              selectedCode={currentLang} 
              onChange={setCurrentLang} 
            />
          </div>
          
          {isTeacher && (
            <div className="flex items-center space-x-4 border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <StatusBadge status={lesson.status} />
              </div>
              <Link
                to={`/lessons/${lesson.id}/translations`}
                className="inline-flex items-center px-4 py-2 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 transition-colors"
              >
                Manage Translations
              </Link>
            </div>
          )}
        </div>

        <div className="px-6 py-8 sm:p-10">
          <div className="prose prose-indigo max-w-none">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{activeTitle}</h1>
            <div className="text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
              {activeContent}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: {formatDate(lesson.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
