'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

const FooterWrapper = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return null; 
  }

  return <Footer />;
};

export default FooterWrapper;