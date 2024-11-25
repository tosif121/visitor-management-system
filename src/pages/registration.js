import dynamic from 'next/dynamic';
import React from 'react';
const VisitorRegistration = dynamic(() => import('@/components/VisitorRegistration'));

function DefaultPage() {
  return (
    <>
      <VisitorRegistration />
    </>
  );
}
export default DefaultPage;
