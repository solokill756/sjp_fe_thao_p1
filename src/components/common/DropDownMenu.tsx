import { Menu, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Fragment } from 'react';

interface DropDownMenuProps {
  values: string[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  as?: 'Link' | 'button';
  links?: string[];
}

export default function DropdownMenu({
  values,
  selectedValue,
  onChange,
  as = 'button',
  links,
}: DropDownMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center hover:text-blue-600 transition-colors">
        {selectedValue || values[0]}
        <HiChevronDown className="ml-1 w-3 h-3" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
          {values.map((value, index) => (
            <Fragment key={value}>
              <Menu.Item>
                {({ active }) =>
                  as === 'button' ? (
                    <button
                      className={`w-full text-left px-3 py-2 text-sm ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                      onClick={() => onChange?.(value)}
                    >
                      {value}
                    </button>
                  ) : (
                    <Link
                      to={links ? links[index] : '#'}
                      className={`block px-3 py-2 text-sm ${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      }`}
                    >
                      {value}
                    </Link>
                  )
                }
              </Menu.Item>

              {index !== values.length - 1 && (
                <div className="border-t border-gray-100 my-1"></div>
              )}
            </Fragment>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
