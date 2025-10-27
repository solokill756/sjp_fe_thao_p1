import { ChevronDown, ChevronRight, Package } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { logOut } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  itemKey: string;
  active?: boolean;
  badge?: string;
  isSub?: boolean;
}
const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  itemKey,
  active,
  badge,
  isSub,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('adminCommon');

  const displayBadge = badge === 'New' ? t('new') : badge;

  const hasSub = !isSub && (itemKey === 'products' || itemKey === 'buyer');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          if (itemKey === 'authentication') {
            dispatch(logOut());
            console.log('Logging out user');
            hasSub && setIsOpen(!isOpen);
            return;
          }
          if (itemKey === 'orders') {
            console.log('Navigating to orders page');
            navigate('/admin/orders');
            hasSub && setIsOpen(!isOpen);
            return;
          }
          if (itemKey === 'dashboard') {
            console.log('Navigating to dashboard page');
            navigate('/admin');
            hasSub && setIsOpen(!isOpen);
            return;
          }
        }}
        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-md ${
          active
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } ${isSub ? 'pl-11' : 'pl-4'}`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={18} />
          <span>{t(itemKey)}</span>
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
            itemKey="sub_item_1"
            isSub={true}
            active={false}
          />
          <NavItem
            icon={Package}
            itemKey="sub_item_2"
            isSub={true}
            active={false}
          />
        </div>
      )}
    </>
  );
};
export default NavItem;
