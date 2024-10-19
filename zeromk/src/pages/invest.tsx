import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

export default function Deposit() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [serialData, setSerialData] = useState<string>(''); // Store serial data

  // Load TradingView widget script once the component is mounted
  useEffect(() => {
    if (chartRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        new (window as any).TradingView.widget({
          width: '100%',
          height: 500,
          symbol: 'BINANCE:BTCUSDT', // Example symbol
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
        });
      };
      chartRef.current.appendChild(script);
    }
  }, []);

  // Function to connect to the ESP32 and read serial data
  const connectToSerial = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      const reader = port.readable.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedValue = decoder.decode(value);
        setSerialData((prev) => prev + decodedValue); // Append new data
      }

      reader.releaseLock();
    } catch (error) {
      console.error('Error connecting to serial port:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Perpetual Trading</title>
        <meta name="description" content="Perpetual Trading - Finn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://i.pinimg.com/originals/d7/91/1c/d7911c291cc89cad36f20b9382c945b0.gif"
        />
      </Head>

      <main className="flex flex-col gap-5 p-5 md:p-10 md:px-44 items-center bg-black min-h-screen text-white">
        <h1 className="font-['trap'] font-bold text-2xl md:text-3xl text-gray-200">
          Perpetual Trading Dashboard
        </h1>

        {/* TradingView Chart and Price System (Side-by-side) */}
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center mb-10">
          {/* TradingView Chart */}
          <div
            className="flex-1"
            id="tradingview_chart"
            ref={chartRef}
            style={{ width: '100%', height: '500px' }}
          />

          {/* Price Put and Call System */}
          <div className="flex flex-col gap-5 text-gray-200 w-full md:w-1/3">
            <div className="border border-gray-700 p-5 rounded">
              <h2 className="font-bold text-xl">Call System</h2>
              <p>Call Price: $25</p>
              <button className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-500 rounded">Buy Call</button>
            </div>

            <div className="border border-gray-700 p-5 rounded">
              <h2 className="font-bold text-xl">Put System</h2>
              <p>Put Price: $20</p>
              <button className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 rounded">Buy Put</button>
            </div>
          </div>
        </div>

        {/* Explanation of Perpetuals Project */}
        <section className="flex flex-col gap-3 text-gray-200 w-full mt-10">
          <h2 className="font-bold text-xl md:text-2xl">About My Perpetuals Project</h2>
          <p>
            The perpetuals project revolves around creating a decentralized perpetual trading system on the blockchain. 
            Users can leverage up to 100x, and the system ensures liquidity, low slippage, and immediate settlement using smart contracts. 
            The protocol interacts with oracles to fetch accurate real-time data and ensures margin trading without expiry dates, making it suitable for continuous trading strategies.
          </p>
        </section>

        {/* ESP32 IoT Project Section */}
        <section className="flex flex-col gap-3 text-gray-200 w-full mt-10">
          <h2 className="font-bold text-xl md:text-2xl">ESP32 IoT Project</h2>
          <p>
            My ESP32 project focuses on creating a smart home automation system, enabling users to control appliances remotely using mobile apps. 
            The system integrates with various sensors to monitor temperature, humidity, and motion, making it energy efficient and customizable.
          </p>
          <h3 className="font-bold text-lg">Connecting ESP32 to Serial Ports</h3>
          <p>
            To connect your ESP32 to the serial ports and retrieve data, you can use the Web Serial API in modern browsers. 
            Here's how you can connect and read data from the ESP32's serial output:
          </p>
          <button onClick={connectToSerial} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
            Connect to ESP32 Serial
          </button>
        </section>

        {/* Serial Monitor Output */}
        <section className="w-full mt-10">
          <h3 className="font-bold text-lg text-gray-200">Serial Monitor Output</h3>
          <div className="bg-gray-800 p-4 rounded max-h-48 overflow-y-auto mt-3">
            <pre className="text-white">{serialData || 'No data received yet...'}</pre>
          </div>
        </section>
      </main>
    </>
  );
}
