import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getClasses, getSubjects, getChapters, createLesson } from '../services/mockService';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

export default function CreateLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultChapterId = location.state?.defaultChapterId || '';

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState(defaultChapterId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Initial load
  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  // When class changes, load subjects
  useEffect(() => {
    if (selectedClass) {
      getSubjects(selectedClass).then(setSubjects);
      setSelectedSubject('');
      setSelectedChapter('');
    } else {
      setSubjects([]);
    }
  }, [selectedClass]);

  // When subject changes, load chapters
  useEffect(() => {
    if (selectedSubject) {
      getChapters(selectedSubject).then(setChapters);
      setSelectedChapter('');
    } else {
      setChapters([]);
    }
  }, [selectedSubject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newLesson = await createLesson({
        classId: Number(selectedClass),
        subjectId: Number(selectedSubject),
        chapterId: Number(selectedChapter),
        title,
        content,
        originalLanguage: 'en',
      });
      navigate(`/lessons/${newLesson.id}/translations`);
    } catch (error) {
      console.error(error);
      alert('Failed to create lesson');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Create New Lesson
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Write the lesson in English. You can translate it later.
        </p>
      </div>

      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <Select
              label="Class"
              required
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              options={[
                { value: '', label: 'Select Class' },
                ...classes.map(c => ({ value: c.id, label: c.name }))
              ]}
            />
            
            <Select
              label="Subject"
              required
              disabled={!selectedClass}
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              options={[
                { value: '', label: 'Select Subject' },
                ...subjects.map(s => ({ value: s.id, label: s.name }))
              ]}
            />
            
            <Select
              label="Chapter"
              required
              disabled={!selectedSubject}
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              options={[
                { value: '', label: 'Select Chapter' },
                ...chapters.map(c => ({ value: c.id, label: `Ch ${c.order}: ${c.name}` }))
              ]}
            />
          </div>

          <Input
            label="Lesson Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Introduction to Fractions"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Content (English)
            </label>
            <div className="mt-1">
              <textarea
                rows={12}
                required
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the comprehensive lesson content here..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} disabled={!selectedChapter || !title || !content}>
              Save & Continue to Translation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
