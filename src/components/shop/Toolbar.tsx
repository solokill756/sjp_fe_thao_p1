import React, { type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FaThLarge, FaList } from 'react-icons/fa';
import type { SortOption, ViewMode } from '../../config/shop/shopConfig';

interface ToolbarProps {
  totalResults: number;
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

const Toolbar: React.FC<ToolbarProps> = ({
  totalResults,
  sortOption,
  setSortOption,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode,
}) => {
  const { t } = useTranslation('shop');
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border">
      <p className="text-gray-600 mb-2 md:mb-0">
        {t('showingResults', { count: totalResults })}
      </p>
      <div className="flex items-center space-x-4">
        {/* Sort Option */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value="default">{t('defaultSorting')}</option>
          <option value="price-asc">{t('sortPriceAsc')}</option>
          <option value="price-desc">{t('sortPriceDesc')}</option>
          <option value="rating-desc">{t('sortRatingDesc')}</option>
        </select>
        {/* Items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          <option value={9}>{t('showN', { count: 9 })}</option>
          <option value={12}>{t('showN', { count: 12 })}</option>
          <option value={18}>{t('showN', { count: 18 })}</option>
        </select>
        {/* View Mode Switcher */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaThLarge className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FaList className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
