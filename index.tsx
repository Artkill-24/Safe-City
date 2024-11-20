import type { NextPage } from 'next';
import Head from 'next/head';
import SafeCityDApp from '../components/SafeCityDApp';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Safe City - Urban Security DApp</title>
        <meta name="description" content="Decentralized urban security reporting system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Safe City
          </h1>
          <SafeCityDApp />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Safe City - Developed by Saad Kaicar</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
