import { forwardRef } from 'react';
import { classNames } from '../utils/helpers';

const Select = forwardRef(({ label, error, options, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={classNames(
          'block w-full rounded-lg border-2 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm px-4 py-2.5 font-medium bg-white cursor-pointer appearance-none',
          error 
            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-400 hover:border-indigo-300',
          props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>{error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
