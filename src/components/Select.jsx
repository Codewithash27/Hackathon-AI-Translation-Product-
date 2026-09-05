import { forwardRef } from 'react';
import { classNames } from '../utils/helpers';

const Select = forwardRef(({ label, error, options, className = '', ...props }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={classNames(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border outline-none transition-colors bg-white',
          error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 text-gray-900',
          props.disabled ? 'bg-gray-50 text-gray-500' : ''
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
