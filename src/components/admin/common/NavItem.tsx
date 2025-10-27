import { ChevronDown, ChevronRight, Package } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  isSub?: boolean;
}
const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active,
  badge,
  isSub,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('adminCommon');

  const displayBadge = badge === 'New' ? t('new') : badge;

  const hasSub = !isSub && (label === t('products') || label === t('buyer'));

  return (
    <>
      <button
        onClick={() => hasSub && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-md ${
          active
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } ${isSub ? 'pl-11' : 'pl-4'}`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={18} />
          <span>{label}</span>
        </div>
        {displayBadge && (
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              badge === 'New'
                ? 'bg-blue-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {displayBadge}
          </span>
        )}
        {hasSub && (
          <span>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>
      {hasSub && isOpen && (
        <div className="flex flex-col">
          <NavItem
            icon={Package}
            label="Sub Item 1"
            isSub={true}
            active={false}
          />
          <NavItem
            icon={Package}
            label="Sub Item 2"
            isSub={true}
            active={false}
          />
        </div>
      )}
    </>
  );
};
export default NavItem;
