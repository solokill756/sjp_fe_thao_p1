export interface DropdownMenuConfig {
  key: string;
  selectedValue: string;
  values: string[];
  links: string[];
}

export interface NavigationLinkConfig {
  key: string;
  label: string;
  href: string;
}

export const getDropdownMenus = (t: any): DropdownMenuConfig[] => [
  {
    key: 'home',
    selectedValue: t('navigation.home'),
    values: ['Cart', 'Checkout', 'Shop', 'My Account'],
    links: ['#', '#', '#', '#'],
  },
  {
    key: 'shop',
    selectedValue: t('navigation.shop'),
    values: ['All Products', 'Featured Items', 'New Arrivals'],
    links: ['#', '#', '#'],
  },
];

export const getNavigationLinks = (t: any): NavigationLinkConfig[] => [
  {
    key: 'fruitsVegetables',
    label: t('navigation.fruitsVegetables'),
    href: '#',
  },
  {
    key: 'beverages',
    label: t('navigation.beverages'),
    href: '#',
  },
  {
    key: 'blog',
    label: t('navigation.blog'),
    href: '#',
  },
  {
    key: 'contact',
    label: t('navigation.contact'),
    href: '#',
  },
];
