import { classNames } from '../utils/helpers';

export default function StatusBadge({ status, className = '' }) {
  const styles = {
    Draft: 'bg-gray-100 text-gray-800 border border-gray-200',
    Generated: 'bg-blue-100 text-blue-800 border border-blue-200',
    Reviewed: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    Published: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    Approved: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    Pending: 'bg-amber-100 text-amber-800 border border-amber-200',
  };

  const defaultStyle = 'bg-gray-100 text-gray-800';

  return (
    <span className={classNames('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', styles[status] || defaultStyle, className)}>
      {status}
    </span>
  );
}
