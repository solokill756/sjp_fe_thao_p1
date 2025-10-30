import { UploadIcon, XCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Loading from '../../common/Loading';

interface ProductImageManagerProps {
  imageUrls: string[];
  productName: string;
  tags: string[] | undefined;
  onImageRemove: (index: number) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingImages: boolean;
}

const ProductImageManager: React.FC<ProductImageManagerProps> = ({
  imageUrls,
  productName,
  tags,
  onImageRemove,
  onImageUpload,
  onInputChange,
  isLoadingImages,
}) => {
  const mainImageUrl = imageUrls[0];
  const { t } = useTranslation('adminProductDetail');
  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {isLoadingImages && <Loading text={t('uploading_image')} />}
        {!isLoadingImages && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('product_images')}
            </h3>
            <div className="mb-4">
              <img
                src={mainImageUrl || '/placeholder-image.png'}
                alt={productName || 'New Product'}
                className="w-full h-auto rounded-lg object-cover aspect-square"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-auto rounded-md object-cover aspect-square border-2 border-transparent group-hover:border-indigo-500 cursor-pointer"
                  />
                  <button
                    onClick={() => onImageRemove(index)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-0 leading-none shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title={`${t('remove_image')}`}
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500">
              <label
                htmlFor="product-image-upload"
                className="cursor-pointer block"
              >
                <UploadIcon className="mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold text-indigo-600">
                    {t('click_to_upload')}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{t('add_new_image')}</p>
                <input
                  id="product-image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={onImageUpload}
                  disabled={isLoadingImages}
                />
              </label>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t('product_tags')}
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags ? tags.join(', ') : ''}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. fruit, fresh, juice"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageManager;
