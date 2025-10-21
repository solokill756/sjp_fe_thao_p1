interface Banner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

export const promotionalBanners: Banner[] = [
  {
    id: '1',
    tag: 'Only This Week',
    title: 'We provide you the best quality products',
    subtitle: 'A family place for grocery',
    image: '/banner-18.jpg.png',
    bgColor: 'bg-[#F3E8E8]',
  },
  {
    id: '2',
    tag: 'Only This Week',
    title: 'We make your grocery shopping more exciting',
    subtitle: 'Shine the morning...',
    image: '/banner-19.jpg.png',
    bgColor: 'bg-[#E8F3F3]',
  },
  {
    id: '3',
    tag: 'Only This Week',
    title: 'The one supermarket that saves your money',
    subtitle: 'Breakfast made better',
    image: '/banner-20.jpg.png',
    bgColor: 'bg-[#F3EEE8]',
  },
];
