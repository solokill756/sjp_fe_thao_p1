export interface Banner {
  id: string;
  preTitle: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  bgColor: string;
  preTitleColor: string;
}

export const groceryBanner: Banner = {
  id: 'grocery-banner',
  preTitle: 'bannerCard.grocery.preTitle',
  title: 'bannerCard.grocery.title',
  subtitle: 'bannerCard.grocery.subtitle',
  imageUrl: '/banner-20.jpg.png',
  imageAlt: 'Hình ảnh thực phẩm',
  bgColor: '#FDFBF6', // Màu nền be nhạt
  preTitleColor: '#D97706', // Màu cam
};

export const needsBanner = {
  id: 'needs-banner',
  preTitle: 'bannerCard.needs.preTitle',
  title: 'bannerCard.needs.title',
  subtitle: 'bannerCard.needs.subtitle',
  imageUrl: '/banner-19.jpg.png',
  imageAlt: 'Hình ảnh túi cà phê',
  bgColor: '#FDFBF6', // Màu nền be nhạt
  preTitleColor: '#D97706', // Màu cam
};
