export interface Filters {
  price: {
    min: number | null;
    max: number | null;
  };
  categories: string[];
  status: {
    inStock: boolean;
    onSale: boolean;
  };
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
