import { useEffect } from 'react';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl shadow-black/10 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in border border-gray-100">
          <div className="bg-gradient-to-b from-white to-gray-50/50 px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
            <div className="w-full">
              <h3 className="text-2xl leading-6 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent" id="modal-title">
                {title}
              </h3>
              <div className="mt-5 text-gray-700">
                {children}
              </div>
            </div>
          </div>
          <div className="bg-gray-50/50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse gap-3 border-t border-gray-100">
            {actions}
            {!actions && (
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
