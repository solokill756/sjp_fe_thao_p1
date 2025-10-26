import React from 'react';
import type { Category } from '../../models/categoryModel';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  categories: Category[];
}

const CategorySection: React.FC<CategoriesProps> = ({ categories }) => {
  const { t } = useTranslation('home');
  return (
    <div className="bg-white p-4 sm:p-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-x-4 gap-y-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/products/${category.id}`}>
              <div
                key={category.id}
                className="flex flex-col items-center justify-start text-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-3 transition-shadow group-hover:shadow-lg">
                  <img
                    src={category.imageUrl}
                    alt={t(`category.${category.id}`, category.name)}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform group-hover:scale-105 duration-200"
                  />
                </div>
                <span className="text-sm text-gray-800 font-medium leading-tight">
                  {t(`category.${category.id}`, category.name)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
