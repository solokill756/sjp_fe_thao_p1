import { useEffect, useState } from 'react';
import { FaLeaf } from 'react-icons/fa';
import { BiFullscreen } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import ImageModal from '../common/ImageModal';
import Button from '../common/Button';

interface ImageGalleryProps {
  images: string[];
  discountPercentage?: number;
  inStock?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  discountPercentage,
  inStock,
}) => {
  const { t } = useTranslation('productDetail');
  function getRandomImages(arr: string[], count: number) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  const [randomImages, setRandomImages] = useState<string[]>(
    getRandomImages(images, Math.min(3, images.length))
  );
  const [mainImage, setMainImage] = useState<string>(
    randomImages[0] || images[0]
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleFullScreen = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const newRandomImages = getRandomImages(images, Math.min(3, images.length));
    setRandomImages(newRandomImages);
    setMainImage(newRandomImages[0] || images[0]);
  }, [images]);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative border border-gray-200 rounded-lg overflow-hidden">
        <img
          src={mainImage}
          alt="Product"
          className="w-full h-auto object-cover aspect-square cursor-zoom-in"
          onClick={handleFullScreen}
        />

        {discountPercentage && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {discountPercentage}%
          </div>
        )}

        {inStock && (
          <div className="absolute top-10 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
            <FaLeaf className="w-3 h-3" />
            {t('inStock', 'IN STOCK')}
          </div>
        )}

        {inStock === false && (
          <div className="absolute top-10 left-3 bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded">
            <FaLeaf className="w-3 h-3 inline-block mr-1" />
            {t('outOfStock', 'OUT OF STOCK')}
          </div>
        )}

        <Button
          variant="custom"
          onClick={handleFullScreen}
          className="absolute bottom-3 left-3 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-opacity duration-200"
        >
          <BiFullscreen className="w-5 h-5 text-gray-700" />
        </Button>
      </div>

      <div className="flex gap-3">
        {randomImages.map((img, index) => (
          <div
            key={index}
            className={`w-20 h-20 border rounded-md cursor-pointer overflow-hidden ${
              mainImage === img
                ? 'border-green-500 ring-2 ring-green-300'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            onClick={() => setMainImage(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {isModalOpen && <ImageModal imageUrl={mainImage} onClose={closeModal} />}
    </div>
  );
};

export default ImageGallery;
