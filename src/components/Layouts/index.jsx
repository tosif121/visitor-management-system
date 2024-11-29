import React, { useState } from 'react';
import { Manrope } from 'next/font/google';
import dynamic from 'next/dynamic';
const TopBarPage = dynamic(() => import('@/components/Layouts/TopBar'));
const SideBarPage = dynamic(() => import('@/components/Layouts/SiderBar'));
const Footer = dynamic(() => import('@/components/Layouts/Footer'));

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

function Layout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`flex flex-col min-h-screen ${manrope.className}`}>
      <TopBarPage handleSidebarToggle={handleSidebarToggle} />
      <div className="flex flex-grow">
        <SideBarPage sidebarVisible={sidebarVisible} />
        <div className="flex-grow flex flex-col">
          <div className="flex-grow md:p-4 p-2">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
