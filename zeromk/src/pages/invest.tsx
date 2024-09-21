import ShowBucket from '@/components/showBucket';
import { polygonAddress } from '@/utils/constants';
import factoryABI from '@/utils/contract/factoryABI.json';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

export default function Deposit() {
  const [buckets, setBuckets] = useState([]);
  
  const { data, error } = useContractRead({
    address: polygonAddress,
    abi: factoryABI,
    functionName: 'getAllBuckets',
    onError: (error) => {
      console.log('Error fetching buckets:', error);
    },
    onSuccess: (data) => {
      console.log('Fetched buckets:', data);
      setBuckets(data); // Update the state with fetched data
    },
  });

  useEffect(() => {
    if (data) {
      setBuckets(data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Invest</title>
        <meta name="description" content="Invest - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif" />
      </Head>
      <main className="flex flex-col gap-5 p-5 md:p-10 md:px-44 items-center">
        <h1 className="font-['trap'] font-bold text-2xl md:text-3xl text-gray-200">
          Just Save Your Precious Time
        </h1>
        <div className="flex gap-5 flex-wrap">
          {buckets.length > 0 ? (
            buckets.map((bucket: any, index: number) => (
              <ShowBucket key={index} address={bucket} />
            ))
          ) : (
            <p className="text-gray-400">No buckets available.</p>
          )}
        </div>
      </main>
    </>
  );
}
