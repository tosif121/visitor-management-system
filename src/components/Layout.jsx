import React from 'react';
import { Manrope } from 'next/font/google';
import dynamic from 'next/dynamic';
// const Header = dynamic(() => import('./Header'));
// const Footer = dynamic(() => import('./Footer'));

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

function Layout({ children }) {
  return (
    <section className={`flex flex-col min-h-screen ${manrope.className}`}>
      {/* <Header /> */}
      <div className="flex-grow ">{children}</div>
      {/* <Footer /> */}
    </section>
  );
}

export default Layout;
