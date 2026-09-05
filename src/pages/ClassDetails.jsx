import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClassById, getSubjects } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ClassDetails() {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getClassById(classId),
      getSubjects(classId)
    ]).then(([cData, sData]) => {
      setClassData(cData);
      setSubjects(sData);
      setLoading(false);
    });
  }, [classId]);

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!classData) return <div>Class not found</div>;

  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100',
    amber: 'bg-amber-50 text-amber-700 group-hover:bg-amber-100',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <nav className="text-sm text-gray-500 font-medium">
        <Link to="/classes" className="hover:text-gray-900">Classes</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{classData.name}</span>
      </nav>

      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {classData.name} Subjects
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Select a subject to view its chapters.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link key={subject.id} to={`/subjects/${subject.id}`} className="block group">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className={`h-14 w-14 rounded-lg flex items-center justify-center text-3xl transition-colors ${colorMap[subject.color] || colorMap.indigo}`}>
                  {subject.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {subject.totalChapters} Chapters
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
