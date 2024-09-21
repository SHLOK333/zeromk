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
        <title>Invest</title>
        <meta name="description" content="Invest - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif" />
      </Head>
      <main className="flex flex-col gap-5 p-5 md:p-10 md:px-44 items-center">
        <h1 className="font-['trap'] font-bold text-2xl md:text-3xl text-gray-200">
          Earn and Grow with big buckets 💰
        </h1>
        <div className="flex gap-5 flex-wrap">
          {data &&
            data.map((bucket: string, index: number) => {
              console.log('Bucket is', bucket);
              return <ShowBucket key={index} address={bucket} />;
            })}
        </div>
      </main>
    </>
  );
}
