import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChapterById, getSubjectById, getClassById, getLessons } from '../services/mockService';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import LessonCard from '../components/LessonCard';

export default function ChapterDetails() {
  const { chapterId } = useParams();
  const { user } = useAuth();
  const [chapter, setChapter] = useState(null);
  const [subject, setSubject] = useState(null);
  const [classData, setClassData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const isTeacher = user?.role === 'Teacher';

  useEffect(() => {
    async function loadData() {
      const chap = await getChapterById(chapterId);
      if (chap) {
        const sub = await getSubjectById(chap.subjectId);
        const cls = await getClassById(sub.classId);
        
        let allLessons = await getLessons({ chapterId: chap.id });
        
        // Students only see published lessons
        if (!isTeacher) {
          allLessons = allLessons.filter(l => l.status === 'Published');
        }
        
        setChapter(chap);
        setSubject(sub);
        setClassData(cls);
        setLessons(allLessons);
      }
      setLoading(false);
    }
    loadData();
  }, [chapterId, isTeacher]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!chapter) return <div>Chapter not found</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <nav className="text-sm text-gray-500 font-medium whitespace-nowrap overflow-x-auto pb-2">
        <Link to="/classes" className="hover:text-gray-900">Classes</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/classes/${classData?.id}`} className="hover:text-gray-900">{classData?.name}</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/subjects/${subject?.id}`} className="hover:text-gray-900">{subject?.name}</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{chapter.name}</span>
      </nav>

      <div className="flex justify-between items-end border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Chapter {chapter.order}: {chapter.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {lessons.length} {lessons.length === 1 ? 'Lesson' : 'Lessons'} available
          </p>
        </div>
        {isTeacher && (
          <Link
            to="/lessons/create"
            state={{ defaultChapterId: chapter.id }}
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isTeacher ? 'Get started by creating a new lesson.' : 'Check back later for new content.'}
          </p>
          {isTeacher && (
            <div className="mt-6">
              <Link
                to="/lessons/create"
                state={{ defaultChapterId: chapter.id }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Lesson
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
