import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const VisitorDetails = dynamic(() => import('@/components/Visitor/VisitorDetails'));

function DefaultPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <VisitorDetails id={id} />
    </>
  );
}
export default DefaultPage;
