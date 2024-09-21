import Card from '@/components/card';
import Head from 'next/head';
import { useContractRead, useAccount } from 'wagmi';
import { polygonAddress } from '@/utils/constants';
import factoryABI from '@/utils/contract/factoryABI.json';
import { useEffect, useState } from 'react';

const buckets = [
  {
    id: 1,
    name: 'RWA - 2024',
    desc: 'A case of RWA tokens like Render, tensor',
  },
  {
    id: 2,
    name: 'RWA - 2024',
    desc: 'A case of RWA tokens like Render, tensor',
  },
  {
    id: 3,
    name: 'RWA - 2024',
    desc: 'A case of RWA tokens like Render, tensor',
  },
  {
    id: 4,
    name: 'RWA - 2024',
    desc: 'A case of RWA tokens like Render, tensor',
  },
];
interface bucket {
  id: string;
  name: string;
  desc: string;
}

export default function Deposit() {
  const [parsedData, setParsedData] = useState<bucket>();
  const { address } = useAccount();
  const { data } = useContractRead({
    address: polygonAddress,
    abi: factoryABI,
    functionName: 'getBucketsByCreator',
    args: [address],
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: (data: any) => {
      console.log('fetched', data);
    },
  });

  const fetchData = async () => {
    try {
      if (data.length > 0) {
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
        <title>Your bucket</title>
        <meta name="description" content="Bucket - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif" />
      </Head>
      <main className="flex flex-col gap-5 p-5 md:p-10 md:px-44 items-center">
        <h1 className="font-['trap'] font-bold text-2xl md:text-3xl text-gray-200">
          Your buckets
        </h1>
        <div className="flex gap-5 flex-wrap">
          {buckets.map((bucket) => {
            console.log('Bucet is', bucket);
            return <Card key={bucket.id} data={bucket} />;
          })}
        </div>
      </main>
    </>
  );
}
