const CHANNELS_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

interface salesChartDataType {
  Sales: number;
  Order: number;
  name: string;
}

interface productsSoldDataType {
  id: number | string;
  name: string;
  sold: number;
  imageUrl: string;
}

interface recentProductsDataType {
  id: number;
  name: string;
  price: number;
  dateAdded: string;
  imageUrl: string;
  currentStock: number;
}

interface CustomerRatingData {
  rating: number;
  ratingCount: number;
  pointsChange: number;
}

export { CHANNELS_COLORS };
export type {
  salesChartDataType,
  productsSoldDataType,
  recentProductsDataType,
  CustomerRatingData,
};
