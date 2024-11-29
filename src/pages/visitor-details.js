import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
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
