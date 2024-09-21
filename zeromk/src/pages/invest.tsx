import ShowBucket from '@/components/showBucket';
import { polygonAddress } from '@/utils/constants';
import factoryABI from '@/utils/contract/factoryABI.json';
import Head from 'next/head';
import { useEffect } from 'react';
import { useContractRead } from 'wagmi';

export default function Deposit() {
  const { data } = useContractRead({
    address: polygonAddress,
    abi: factoryABI,
    functionName: 'getAllBuckets',
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: (data: any) => {
      console.log('fetched', data);
    },
  });

  const fetchData = async () => {
    try {
      if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          console.log(data[index]);
        }
      }
    } catch (error) {
      return {
        notFound: true,
      };
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <>
      <Head>
        <title>Invest</title>
        <meta name="description" content="Invest - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif"
        />
      </Head>

      {/* Main Content */}
      <main className="flex flex-col gap-6 p-5 md:p-10 items-center bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen">
        {/* Heading */}
        <h1 className="font-['trap'] font-extrabold text-2xl md:text-4xl text-teal-400 text-center">
          Save Your Precious Time, Guys!
        </h1>

        {/* Bucket List */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[1080px]">
          {data && data.length > 0 ? (
            data.map((bucket: string, index: number) => {
              console.log('Bucket is', bucket);
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300 ease-in-out"
                >
                  <ShowBucket address={bucket} />
                </div>
              );
            })
          ) : (
            <p className="text-gray-300">No buckets available.</p>
          )}
        </div>
      </main>
    </>
  );
}
