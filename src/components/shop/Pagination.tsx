import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation('shop');
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            {t('previous')}
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`py-2 px-3 leading-tight border ${
                page === currentPage
                  ? 'text-blue-600 bg-blue-50 border-blue-300'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            {t('next')}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
