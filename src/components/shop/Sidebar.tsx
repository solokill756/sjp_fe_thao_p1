import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { AppDispatch, RootState } from '../../app/store';
import { setFilters } from '../../features/shop/filterSlice';
import type { ChangeEvent } from 'react';
import type { Filters } from '../../config/shop/shopConfig';
import FilterSection from './FilterSection';
import type { Category } from '../../models/categoryModel';

interface SidebarProps {
  priceMin: number;
  priceMax: number;
  filters: Filters;
  categories: Category[] | undefined;
}
const Sidebar: React.FC<SidebarProps> = ({
  priceMin,
  priceMax,
  filters,
  categories,
}) => {
  const { t } = useTranslation('shop');
  const minVal = filters.price?.min ?? priceMin;
  const maxVal = filters.price?.max ?? priceMax;
  const rangeMinPercent = ((minVal - priceMin) / (priceMax - priceMin)) * 100;
  const rangeMaxPercent =
    100 - ((maxVal - priceMin) / (priceMax - priceMin)) * 100;
  const dispatch = useDispatch<AppDispatch>();
  const { price } = useSelector((state: RootState) => state.filter);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const priceValue =
      value === '' ? null : value !== null ? Number(value) : null;
    if (priceValue !== null) {
      if (name === 'min' && priceValue < priceMin) return;
      if (name === 'max' && priceValue > priceMax) return;
    }
    dispatch(
      setFilters({
        ...filters,
        price: {
          ...price,
          [name]: priceValue,
        },
      })
    );
  };
  const handleCheckboxChange = (
    filterType: keyof Omit<Filters, 'price' | 'status'>,
    value: number
  ) => {
    const currentValues = filters[filterType] as number[];
    let updatedValues: number[];
    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((v) => v !== value);
    } else {
      updatedValues = [...currentValues, value];
    }
    dispatch(
      setFilters({
        ...filters,
        [filterType]: updatedValues,
      })
    );
  };

  const handleMinSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(
      Number(e.target.value),
      (filters.price?.max ?? priceMax) - 1
    );
    if (newMin < priceMin || newMin > maxVal) return;
    dispatch(
      setFilters({
        ...filters,
        price: {
          ...price,
          min: newMin,
        },
      })
    );
  };

  const handleMaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(
      Number(e.target.value),
      (filters.price?.min ?? priceMin) + 1
    );
    if (newMax > priceMax || newMax < minVal) return;
    dispatch(
      setFilters({
        ...filters,
        price: {
          ...price,
          max: newMax,
        },
      })
    );
  };

  return (
    <aside className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{t('filters')}</h2>

      <FilterSection title={t('filterByPrice')}>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="number"
            name="min"
            placeholder="Min"
            value={minVal}
            onChange={handlePriceChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            name="max"
            placeholder="Max"
            value={maxVal}
            onChange={handlePriceChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="relative h-5">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-10"></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-20"
            style={{
              right: `${rangeMaxPercent}%`,
              left: `${rangeMinPercent}%`,
            }}
          ></div>
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            value={minVal}
            onChange={handleMinSliderChange}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-transparent appearance-none pointer-events-none z-30 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={priceMin}
            max={priceMax}
            value={maxVal}
            onChange={handleMaxSliderChange}
            className="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-transparent appearance-none pointer-events-none z-30 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          {t('price')}:{' '}
          <span className="font-semibold">
            ${minVal} &mdash; ${maxVal}
          </span>
        </div>
      </FilterSection>

      <FilterSection title={t('productCategories')}>
        <ul className="space-y-2">
          {categories!.map((cat) => {
            return (
              <li key={cat.id}>
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat.id) || false}
                    onChange={() => handleCheckboxChange('categories', cat.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 flex items-center gap-1">
                    {cat.name}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterSection>

      <FilterSection title={t('productStatus')}>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={filters.status?.inStock || false}
                onChange={() =>
                  dispatch(
                    setFilters({
                      ...filters,
                      status: {
                        ...filters.status,
                        inStock: !filters.status?.inStock,
                      },
                    })
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{t('inStock')}</span>
            </label>
          </li>
          <li>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={filters.status?.onSale || false}
                onChange={() =>
                  dispatch(
                    setFilters({
                      ...filters,
                      status: {
                        ...filters.status,
                        onSale: !filters.status?.onSale,
                      },
                    })
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{t('onSale')}</span>
            </label>
          </li>
        </ul>
      </FilterSection>
    </aside>
  );
};

export default Sidebar;
