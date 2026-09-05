import { useState, useEffect } from 'react';
import { getTerminology, getLanguages, getSubjects } from '../services/mockService';
import LoadingSpinner from '../components/LoadingSpinner';
import TerminologyTable from '../components/TerminologyTable';
import Select from '../components/Select';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Terminology() {
  const [terminology, setTerminology] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  const [currentLang, setCurrentLang] = useState('mr');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      const [langs, subs] = await Promise.all([
        getLanguages(),
        getSubjects()
      ]);
      setLanguages(langs.filter(l => l.code !== 'en'));
      
      // Get unique subject names
      const uniqueSubjects = [...new Set(subs.map(s => s.name))];
      setSubjects(uniqueSubjects);
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function fetchTerminology() {
      setLoading(true);
      const data = await getTerminology({
        subject: subjectFilter,
        search: searchQuery
      });
      setTerminology(data);
      setLoading(false);
    }
    
    // Debounce search
    const timer = setTimeout(() => {
      fetchTerminology();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [subjectFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Terminology Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage translations for subject-specific terms to ensure consistency across lessons.
          </p>
        </div>
        <Button>Add New Term</Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <Input
            label="Search terms"
            placeholder="Search in English or local language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select
            label="Subject"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            options={[
              { value: '', label: 'All Subjects' },
              ...subjects.map(s => ({ value: s, label: s }))
            ]}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select
            label="Target Language"
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            options={languages.map(l => ({ value: l.code, label: l.name }))}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      ) : (
        <TerminologyTable 
          terminology={terminology} 
          currentLanguage={currentLang} 
        />
      )}
    </div>
  );
}
