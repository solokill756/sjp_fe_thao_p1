import { Link } from 'react-router-dom';

interface SideBarLinkProps {
  href: string;
  isActive?: boolean;
  title: string;
}
export default function SidebarLink({
  href,
  isActive = false,
  title,
}: SideBarLinkProps) {
  const activeClasses = 'bg-gray-100 font-semibold text-blue-600';
  const defaultClasses = 'text-gray-600 hover:bg-gray-100';
  return (
    <Link
      to={href}
      className={`block px-4 py-2 text-sm rounded-md ${
        isActive ? activeClasses : defaultClasses
      }`}
    >
      {title}
    </Link>
  );
}
