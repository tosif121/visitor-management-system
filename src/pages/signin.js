import React from 'react';
import dynamic from 'next/dynamic';
const Signin = dynamic(() => import('@/components/Signin'));

function DefaultPage() {
  return (
    <>
      <Signin />
    </>
  );
}
export default DefaultPage;
