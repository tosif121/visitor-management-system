import React from 'react';
import dynamic from 'next/dynamic';
const VisitorRegistration = dynamic(() => import('@/components/Visitor/VisitorRegistration'));

function DefaultPage() {
  return (
    <>
      <VisitorRegistration />
    </>
  );
}
export default DefaultPage;
