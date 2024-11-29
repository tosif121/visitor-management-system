import '../styles/globals.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
const Layout = dynamic(() => import('../components/Layouts'));

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage = ['/signin', '/visitor-details'].includes(router.pathname);

  return (
    <>
      <Head>
        <title>Visitor Management System</title>
        <meta name="description" content="visitor management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
