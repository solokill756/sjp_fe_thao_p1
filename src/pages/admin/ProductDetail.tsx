import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailHeader from '../../components/admin/productDetail/ProductDetailHeader';
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductByIdQuery,
} from '../../features/api/apiSlice';
import ProductImageManager from '../../components/admin/productDetail/ProductImageManager';
import ProductInfoForm from '../../components/admin/productDetail/ProductInfoForm';
import ProductReviewList from '../../components/admin/productDetail/ProductReviewList';
import Loading from '../../components/common/Loading';
import { NotFoundPage } from '../../components/error';
import type { Product } from '../../models/productModel';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function ProductDetailAdmin() {
  const { t } = useTranslation('adminProductDetail');
  const navigate = useNavigate();
  const productId = useParams<{ id: string }>().id;
  const mode = productId ? 'detail' : 'add';
  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useGetProductByIdQuery(Number(productId), {
    skip: mode === 'add' || !productId,
  });
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const [formData, setFormData] = useState<Product>(
    product ?? {
      id: new Date().getTime(),
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      salePercentage: 0,
      categoryId: 0,
      tags: [],
      imageUrls: [],
      stockCurrent: 0,
      reviews: [],
      reviewCount: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
    }
  );
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);
  // Functions
  const onBack = () => {
    navigate(-1);
  };
  const onSave = async (data: Product) => {
    if (!data.name || data.name.trim().length < 3) {
      toast.error(t('validation_name_required'));
      return;
    }
    if (!data.originalPrice || data.originalPrice <= 0) {
      toast.error(t('validation_original_price_positive'));
      return;
    }
    if (!data.imageUrls || data.imageUrls.length === 0) {
      toast.error(t('validation_image_required'));
      return;
    }
    const newData = {
      ...data,
      price: Number(
        (
          data.originalPrice *
          (1 - (data.salePercentage ? data.salePercentage : 0) / 100)
        ).toFixed(1)
      ),
    };
    try {
      if (mode === 'add') {
        await addProduct(newData).unwrap();
        toast.success(t('product_added_successfully'));
        onBack();
      } else {
        await editProduct(newData).unwrap();
        toast.success(t('product_updated_successfully'));
        onBack();
      }
    } catch (error) {
      console.error(t('save_product_error'), error);
      toast.error(t('failed_to_save_product'));
    }
  };
  const onDelete = async (data: Product) => {
    try {
      if (!data.id) {
        toast.error(t('invalid_product_id'));
        return;
      }
      const confirm = window.confirm(t('confirm_delete_product'));
      if (!confirm) {
        return;
      }
      await editProduct({ ...data, isDeleted: true }).unwrap();
      toast.success(t('product_deleted_successfully'));
      onBack();
    } catch (error) {
      console.error(t('delete_product_error'), error);
      toast.error(t('failed_to_delete_product'));
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'select-one') {
      const selectedValue = value;
      console.log('Select changed:', name, selectedValue);
      setFormData((prev) => ({ ...prev, [name]: Number(selectedValue) }));
    } else if (name === 'tags') {
      const tags = value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      setFormData((prev) => ({ ...prev, tags }));
    } else {
      const valueToSet =
        type === 'number' ? (value === '' ? '' : parseFloat(value)) : value;
      setFormData((prev) => ({ ...prev, [name]: valueToSet }));
    }
  };
  const handleImageRemove = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', file);
    formDataCloudinary.append('upload_preset', 'demo_project1_frontend');

    try {
      setIsLoadingImages(true);
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/doycdzvf6/image/upload',
        {
          method: 'POST',
          body: formDataCloudinary,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, data.secure_url],
        }));
      }
    } catch (error) {
      console.error(t('cloudinary_upload_error'), error);
    } finally {
      setIsLoadingImages(false);
    }
  };
  const formattedDate =
    mode === 'detail' && formData.createdAt
      ? new Date(formData.createdAt).toLocaleString()
      : 'N/A';

  if (isLoadingProduct || isAdding || isEditing) {
    if (mode === 'detail' && isLoadingProduct) {
      return <Loading text={t('loading_product_details')} />;
    }
    if (mode === 'add' && isAdding) {
      return <Loading text={t('adding_new_product')} />;
    }
    if (mode === 'detail' && isEditing) {
      return <Loading text={t('updating_product')} />;
    }
    return <Loading fullScreen />;
  }
  if (isErrorProduct) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full">
      {/* 1. Header */}
      <ProductDetailHeader
        mode={mode}
        onBack={onBack}
        onSaveClick={() => onSave(formData)}
        onDeleteClick={() => onDelete(formData)}
      />

      {/* 2. Layout 2 cột */}
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImageManager
          imageUrls={formData.imageUrls}
          productName={formData.name}
          tags={formData.tags}
          onImageRemove={handleImageRemove}
          onImageUpload={handleImageUpload}
          onInputChange={handleInputChange}
          isLoadingImages={isLoadingImages}
        />

        <ProductInfoForm
          formData={formData}
          onInputChange={handleInputChange}
          mode={mode}
          formattedDate={formattedDate}
        />
      </div>

      {mode === 'detail' && (
        <ProductReviewList
          reviews={formData.reviews}
          reviewCount={formData.reviewCount}
        />
      )}
    </div>
  );
}
