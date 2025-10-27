import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

const Logo: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex flex-col items-center p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2 mb-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShoppingCart className="text-white" />
        </div>
        <span className="text-white text-xl font-bold">ShopStore</span>
      </div>
      <div className="flex items-center space-x-2">
        <img
          className="w-8 h-8 rounded-full"
          src={`https://placehold.co/40x40/E2E8F0/334155?text=${user?.username
            ?.charAt(0)
            .toUpperCase()}`}
        />
        <div className="text-left">
          <span className="text-white text-sm font-medium">
            {user?.username}
          </span>
          <span className="text-gray-400 text-xs block">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
