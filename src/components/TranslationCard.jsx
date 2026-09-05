import StatusBadge from './StatusBadge';
import { formatDate } from '../utils/helpers';
import Button from './Button';

export default function TranslationCard({ 
  translation, 
  originalLesson, 
  onReview, 
  onPublish, 
  loading 
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-medium text-gray-900 uppercase">
            {translation.language}
          </span>
          <StatusBadge status={translation.status} />
        </div>
        <div className="text-sm text-gray-500">
          Generated on {formatDate(translation.createdAt)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        {/* Original */}
        <div className="p-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Original (English)
          </h4>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {originalLesson.title}
          </h3>
          <div className="prose prose-sm text-gray-700 max-w-none">
            <p className="whitespace-pre-wrap">{originalLesson.content}</p>
          </div>
        </div>

        {/* Translation */}
        <div className="p-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Translation
          </h4>
          <h3 className="text-lg font-bold text-indigo-700 mb-4">
            {translation.translatedTitle}
          </h3>
          <div className="prose prose-sm text-gray-700 max-w-none">
            <p className="whitespace-pre-wrap">{translation.translatedContent}</p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Terminology Validation</h4>
            {translation.validated ? (
              <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All terminology verified against approved dictionary
              </div>
            ) : (
              <div className="space-y-2">
                {translation.terminologyIssues.map((issue, idx) => (
                  <div key={idx} className="flex items-start text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
        {translation.status === 'Generated' && (
          <Button 
            onClick={() => onReview(translation.id)} 
            isLoading={loading}
          >
            Review Translation
          </Button>
        )}
        {translation.status === 'Reviewed' && (
          <Button 
            onClick={() => onPublish(translation.id)}
            variant="success"
            isLoading={loading}
          >
            Publish Translation
          </Button>
        )}
      </div>
    </div>
  );
}
