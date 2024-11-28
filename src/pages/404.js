import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function DefaultPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return <></>;
}
export default DefaultPage;
