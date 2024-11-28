import React, { useState } from 'react';
import Footer from '@/components/Layouts/Footer';
import SideBarPage from '@/components/Layouts/SiderBar';
import { Manrope } from 'next/font/google';
import TopBarPage from '@/components/Layouts/TopBar';

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
    <section className={`flex flex-col min-h-screen ${manrope.className}`}>
      <TopBarPage handleSidebarToggle={handleSidebarToggle} />
      <div className="flex flex-grow">
        <SideBarPage sidebarVisible={sidebarVisible} />
        <main className="flex-grow flex flex-col p-4">
          <div className="flex-grow p-2">{children}</div>
          <Footer />
        </main>
      </div>
    </section>
  );
}

export default Layout;
