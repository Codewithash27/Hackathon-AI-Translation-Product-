import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getLessonById, 
  getTranslations, 
  getLanguages,
  generateTranslation,
  validateTerminology,
  reviewTranslation,
  publishTranslation
} from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';
import TranslationCard from '../components/TranslationCard';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Translations() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLangCode, setSelectedLangCode] = useState('');
  
  const loadData = async () => {
    setLoading(true);
    try {
      const [les, trans, langs] = await Promise.all([
        getLessonById(lessonId),
        getTranslations(lessonId),
        getLanguages()
      ]);
      setLesson(les);
      setTranslations(trans);
      setLanguages(langs.filter(l => l.code !== 'en')); // Exclude default language
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [lessonId]);

  const handleGenerate = async () => {
    if (!selectedLangCode) return;
    setActionLoading(true);
    try {
      const newTrans = await generateTranslation(lessonId, selectedLangCode);
      // Automatically validate terminology after generation to demonstrate the feature
      await validateTerminology(newTrans.id);
      setIsModalOpen(false);
      setSelectedLangCode('');
      await loadData();
    } catch (error) {
      console.error(error);
      alert('Failed to generate translation');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReview = async (id) => {
    setActionLoading(true);
    try {
      await reviewTranslation(id);
      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePublish = async (id) => {
    setActionLoading(true);
    try {
      await publishTranslation(id);
      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  if (!lesson) return <div>Lesson not found</div>;

  // Find languages that don't have translations yet
  const availableLangs = languages.filter(
    l => !translations.some(t => t.language === l.code)
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <nav className="text-sm text-gray-500 font-medium">
        <Link to={`/lessons/${lessonId}`} className="hover:text-gray-900">Back to Lesson</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Manage Translations</span>
      </nav>

      <div className="flex justify-between items-end border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Translations for: {lesson.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Generate, review, and publish translations with AI and terminology validation.
          </p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          disabled={availableLangs.length === 0}
        >
          Generate New Translation
        </Button>
      </div>

      <div className="space-y-8">
        {translations.map((translation) => (
          <TranslationCard
            key={translation.id}
            translation={translation}
            originalLesson={lesson}
            onReview={handleReview}
            onPublish={handlePublish}
            loading={actionLoading}
          />
        ))}

        {translations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No translations yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate a translation to get started.
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !actionLoading && setIsModalOpen(false)}
        title="Generate AI Translation"
        actions={
          <>
            <Button 
              onClick={handleGenerate}
              isLoading={actionLoading}
              disabled={!selectedLangCode}
              className="ml-3"
            >
              Generate
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setIsModalOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
          </>
        }
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-4">
            Select a language to generate a translation using the B4One AI engine. The translation will be checked against your approved terminology.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {availableLangs.map((lang) => (
              <div 
                key={lang.code}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedLangCode === lang.code 
                    ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500' 
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedLangCode(lang.code)}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-gray-900">{lang.nativeName}</div>
                    <div className="text-xs text-gray-500">{lang.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {availableLangs.length === 0 && (
            <p className="text-sm text-amber-600">All available languages have been generated.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
