import type { Banner } from './bannerCardConfig';

export const promotionalBanners: Omit<Banner, 'preTitleColor'>[] = [
  {
    id: '1',
    preTitle: 'promotionalBanners.1.preTitle',
    title: 'promotionalBanners.1.title',
    subtitle: 'promotionalBanners.1.subtitle',
    imageUrl: '/banner-18.jpg.png',
    bgColor: 'bg-[#F3E8E8]',
    imageAlt: 'Hình ảnh gia đình mua sắm',
  },
  {
    id: '2',
    preTitle: 'promotionalBanners.2.preTitle',
    title: 'promotionalBanners.2.title',
    subtitle: 'promotionalBanners.2.subtitle',
    imageUrl: '/banner-19.jpg.png',
    bgColor: 'bg-[#E8F3F3]',
    imageAlt: 'Hình ảnh buổi sáng với cà phê',
  },
  {
    id: '3',
    preTitle: 'promotionalBanners.3.preTitle',
    title: 'promotionalBanners.3.title',
    subtitle: 'promotionalBanners.3.subtitle',
    imageUrl: '/banner-20.jpg.png',
    bgColor: 'bg-[#F3EEE8]',
    imageAlt: 'Hình ảnh bữa sáng với bánh mì',
  },
];
