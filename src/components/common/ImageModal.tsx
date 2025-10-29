import Button from './Button';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-0 transition-opacity duration-200 w-screen h-screen"
      onClick={onClose}
    >
      <Button
        variant="custom"
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-5xl font-bold hover:text-gray-300 transition-colors duration-200 z-50 bg-transparent p-0"
      >
        &times;
      </Button>
      <div
        className="relative flex justify-center items-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Fullscreen product"
          className="w-auto h-auto max-w-screen-lg max-h-screen object-contain rounded-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default ImageModal;
