import StatusBadge from './StatusBadge';

export default function TerminologyTable({ terminology, currentLanguage }) {
  if (terminology.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No terminology found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                English Term
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approved Translation ({currentLanguage.toUpperCase()})
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {terminology.map((item) => {
              const translation = item.translations[currentLanguage];
              
              return (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.englishTerm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {item.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {translation ? translation.term : <span className="text-gray-400 italic">Not set</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {translation ? (
                      <StatusBadge status={translation.status} />
                    ) : (
                      <StatusBadge status="Draft" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mx-2">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
