import type React from 'react';

import { useTranslation } from 'react-i18next';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  // Nếu title là key i18n thì sẽ dịch, còn không thì giữ nguyên
  const { t } = useTranslation('shop');
  const displayTitle = t(title);
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-3 pb-2 border-b">{displayTitle}</h3>
      {children}
    </div>
  );
};

export default FilterSection;
