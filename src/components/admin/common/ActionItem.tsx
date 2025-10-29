const ActionItem: React.FC<{
  label: string;
  onClick: () => void;
  icon?: React.ElementType;
  variant?: 'default' | 'danger';
}> = ({ label, onClick, icon: Icon, variant = 'default' }) => {
  const colorClasses =
    variant === 'danger'
      ? 'text-red-700 hover:bg-red-50'
      : 'text-gray-700 hover:bg-gray-100';

  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${colorClasses}`}
      >
        {Icon && <Icon size={16} />}
        <span>{label}</span>
      </button>
    </li>
  );
};

export default ActionItem;
