import { useState, useEffect } from 'react';
import { getLanguages } from '../services/mockService';
import { classNames } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

export default function LanguageSelector({ selectedCode, onChange, className = '' }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLanguages().then(data => {
      setLanguages(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner size="sm" />;

  return (
    <div className={classNames("flex gap-2 flex-wrap", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={classNames(
            'flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
            selectedCode === lang.code
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          )}
        >
          <span className="mr-2 text-lg leading-none">{lang.flag}</span>
          {lang.nativeName}
          {lang.name !== lang.nativeName && <span className="ml-1 text-xs text-gray-400">({lang.name})</span>}
        </button>
      ))}
    </div>
  );
}
