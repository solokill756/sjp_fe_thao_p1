import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaBook, FaHeart, FaShieldAlt } from 'react-icons/fa';

const SafetyBanner: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className="bg-orange-100 rounded-lg p-6 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-orange-200 rounded-full p-3 mr-4">
          <FaCheckCircle className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {t(
              'healthSafety',
              'In store or online your health & safety is our top priority'
            )}
          </h3>
          <p className="text-gray-600">
            {t(
              'healthSafetyDesc',
              'Every employee has been paid extra for their safety in our store working during coronavirus time'
            )}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FaBook className="w-6 h-6 text-blue-600" />
        </div>
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <FaHeart className="w-6 h-6 text-red-600" />
        </div>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <FaShieldAlt className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default SafetyBanner;
