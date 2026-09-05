import { classNames } from '../utils/helpers';
import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={classNames(
          'block w-full rounded-lg border-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm px-4 py-2.5 font-medium',
          error 
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-400 hover:border-indigo-300',
          props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>{error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
