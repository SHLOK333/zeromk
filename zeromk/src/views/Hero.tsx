import React, { useEffect } from "react";
import Link from "next/link";
import { useStore } from '@/store';
import useCreateBucket from '@/hooks/useCreateBucket';

export default function Hero() {
  const { bucketName, setBucketName } = useStore();
  const { createBucket } = useCreateBucket();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Ethereum Chart
      new window.TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "BINANCE:ETHUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_legend": true,
        "save_image": false,
        "container_id": "eth_chart"
      });

      // Bitcoin Chart
      new window.TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "3",  // Changing style to bars
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_legend": true,
        "save_image": false,
        "container_id": "btc_chart"
      });

      // Binance Coin Chart
      new window.TradingView.widget({
        "width": "100%",
        "height": 400,
        "symbol": "BINANCE:BNBUSDT",
        "interval": "W", // Weekly data
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "9",  // Line chart style
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_legend": true,
        "save_image": false,
        "container_id": "bnb_chart"
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-12 bg-teal-600">
      {/* Hero Section */}
      <div className="ramp md:text-left h-[calc(90vh-60px)] flex flex-col md:flex-row justify-center md:ml-28 lg:mt-0 md:mt-0 sm:mt-24">
        <div className="flex flex-col font-['Roobert'] justify-center m-5 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block font-['trap'] bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text pb-4">
              Cyber Surge 
            </span>
            <span className="block text-teal-500 text-2xl font-medium tracking-tight">
              Crafting a Robust Investment Strategy
            </span>
          </h1>
          <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 text-gray-400">
            Manage diverse cryptocurrencies with powerful visual insights.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center md:justify-start lg:justify-start flex-row">
            <div>
              <Link
                href="/invest"
                className="w-full flex items-center justify-center px-8 py-3 border-0 border-transparent text-base font-medium rounded-3xl text-white bg-neutral-800 hover:bg-teal-400 hover:text-neutral-800"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <div className="my-auto w-full md:w-[60%] sm:w-[70%] sm:mx-auto items-end">
          <div className="relative">
            <img
              src="https://www.shriramamc.in/bundle/assets/images/flexi-cap/gif/flexi-fund.gif"
              alt="ProfileVector"
              width="1550"
              height="1500"
            />
          </div>
        </div>
      </div>

      {/* TradingView Charts */}
      <div className="p-8 w-full">
        <h2 className="text-xl font-bold text-white mb-4">Ethereum Price Chart</h2>
        <div id="eth_chart" className="tradingview-widget-container mb-12"></div>

        <h2 className="text-xl font-bold text-white mb-4">Bitcoin Price Chart</h2>
        <div id="btc_chart" className="tradingview-widget-container mb-12"></div>

        <h2 className="text-xl font-bold text-white mb-4">Binance Coin Price Chart</h2>
        <div id="bnb_chart" className="tradingview-widget-container mb-12"></div>
      </div>
    </div>
  );
}
