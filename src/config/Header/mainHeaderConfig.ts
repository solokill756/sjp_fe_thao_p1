interface MenuItem {
  label: string;
  onClick: () => void;
  className: string;
  isDivider?: boolean;
}

export const getAuthenticatedMenuItems = (
  navigate: (path: string) => void
): MenuItem[] => [
  {
    label: 'My Profile',
    onClick: () => navigate('/profile'),
    className: 'text-gray-700',
  },
  {
    label: 'My Orders',
    onClick: () => navigate('/orders'),
    className: 'text-gray-700',
  },
  {
    label: 'My Wishlist',
    onClick: () => navigate('/wishlist'),
    className: 'text-gray-700',
  },
];

export const getGuestMenuItems = (
  navigate: (path: string) => void
): MenuItem[] => [
  {
    label: 'Sign In',
    onClick: () => navigate('/auth?tab=login'),
    className: 'text-gray-700',
  },
  {
    label: 'Create Account',
    onClick: () => navigate('/auth?tab=register'),
    className: 'text-gray-700',
  },
];
