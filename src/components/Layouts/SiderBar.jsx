import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navBarData } from '@/utils/navData';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function SideBarPage({ sidebarVisible }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeIndex]);

  const logout = () => {
    Cookies.remove('vms_token', { path: '/' });
    localStorage.removeItem('userDetails');
    localStorage.removeItem('theme');
    router.push('/signin');
    window.location.reload();
  };

  const closeDropdown = () => {
    setActiveIndex(null);
  };

  const handleItemClick = (item) => {
    if (item.type === 'action' && item.label === 'Sign Out') {
      logout();
    } else if (item.type === 'link') {
      router.push(item.link);
    }
  };

  return (
    <ul
      ref={dropdownRef}
      className={`px-5 transition-all border-e dark:border-[#333] border-[#ddd] duration-500 whitespace-nowrap bg-white dark:bg-[#1a1a1a] ${
        sidebarVisible ? 'w-64' : 'w-20'
      }`}
    >
      {navBarData.map((item, index) => (
        <SidebarItem
          key={index}
          router={router}
          item={item}
          isActive={activeIndex === index}
          handleItemClick={handleItemClick}
          sidebarVisible={sidebarVisible}
        />
      ))}
    </ul>
  );
}

const SidebarItem = ({ item, isActive, onToggle, handleItemClick, sidebarVisible }) => {
  return (
    <li className="relative pt-3">
      <div
        onClick={() => handleItemClick(item)}
        className={`flex items-center justify-between cursor-pointer transition-colors duration-300 rounded-md ${
          isActive
            ? 'text-white dark:text-white dark:bg-[#001750] bg-primary'
            : `text-gray-900 dark:text-white hover:bg-blue-50 dark:hover:bg-[#00498E]`
        }`}
      >
        <div className={`font-medium flex items-center gap-x-3 p-2.5 w-full`}>
          <FontAwesomeIcon icon={item.icon} className="text-lg" width={20} height={20} />
          <span
            className={`font-medium transition-opacity duration-300 ${
              sidebarVisible ? 'w-full ms-s3 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            {item.label}
          </span>
        </div>
      </div>
    </li>
  );
};
