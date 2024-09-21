import React, { Fragment } from "react";
import { FaBucket } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import { useStore } from '@/store';
import Input from '@/components/form-elements/input';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { networkOptions, tokenOptions } from '@/utils/constants';
import Chip from '@/components/Chip';
import useCreateBucket from '@/hooks/useCreateBucket';

export default function Hero() {
  const {
    bucketName,
    setBucketName,
    selectedNetwork,
    setSelectedNetwork,
    selectedTokens,
    setSelectedTokens,
    setProportion,
    riskLevel,
    setRiskLevel,
  } = useStore();

  const { createBucket } = useCreateBucket();

  return (
    <div className="flex flex-col items-center justify-center py-20 md:py-12 bg-teal-600"> {/* Changed the color */}
      {/* Hero Section */}
      <div className="ramp md:text-left h-[calc(90vh-60px)] flex flex-col md:flex-row justify-center md:ml-28 lg:mt-0 md:mt-0 sm:mt-24">
        <div className="flex flex-col font-['Roobert'] justify-center m-5 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block font-['trap'] bg-gradient-to-r from-teal-200 to-teal-400 text-transparent bg-clip-text pb-4">
              TokenTechies
            </span>
            <span className="block text-teal-500 text-2xl font-medium tracking-tight">
              Crafting a Robust Investment Strategy
            </span>
          </h1>
          <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-lg lg:mx-0 text-gray-400">
            Think of it like gathering tokens into buckets, each representing different networks...
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

      {/* Create Bucket Section */}
      <main className="flex p-6 md:p-8 justify-center items-center min-h-screen bg-green-600 w-full">
        <div className="flex flex-col w-full md:w-[60%] gap-6 p-8 bg-neutral-800 border border-gray-700 rounded-xl shadow-xl">
          <h1 className="text-center text-3xl text-teal-300 font-bold font-['trap'] mb-6">
            TRACK YOUR CRYPTO MUTUALS
          </h1>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Bucket Name */}
            <Input
              id="bucketName"
              name="bucketname"
              label="Bucket Name"
              placeholder="ETH-SINGAPORE FUNDS"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              className="lg:w-1/2 text-gray-200"
            />
            
            {/* Risk Level Slider */}
            <div className="lg:w-1/2">
              <label className="text-teal-200 text-sm font-semibold mb-1">
                Risk Level: {riskLevel}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={riskLevel}
                onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-gray-400 text-sm">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Network and Tokens Selection */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Network Selection */}
            <div className="lg:w-1/2">
              <label className="text-teal-200 text-sm font-semibold mb-1">
                Select Network
              </label>
              <Listbox
                value={selectedNetwork}
                onChange={(value) => {
                  setSelectedNetwork(value);
                  setSelectedTokens(tokenOptions[value.id]);
                }}
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-3 pl-4 pr-8 text-left shadow-lg text-white">
                    <span className="block truncate">{selectedNetwork.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IoChevronDownOutline className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition-opacity ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto rounded-lg bg-gray-800 py-2 text-base shadow-lg focus:outline-none">
                      {networkOptions.map((network, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-gray-600 text-teal-300' : 'text-gray-200'
                            }`
                          }
                          value={network}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {network.name}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                                  <FaCheck className="h-4 w-4" aria-hidden="true" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Token Selection */}
            <div className="lg:w-1/2">
              <label className="text-teal-200 text-sm font-semibold mb-1">
                Select Tokens
              </label>
              <Listbox
                value={selectedTokens}
                onChange={(value) => {
                  setSelectedTokens(value);
                  const arr = new Array(value.length).fill(0);
                  setProportion(arr);
                }}
                multiple
              >
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-700 py-3 pl-4 pr-8 text-left shadow-lg text-white">
                    <span className="block truncate">
                      {selectedTokens.map((token) => token.name).join(', ')}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <IoChevronDownOutline className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition-opacity ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto rounded-lg bg-gray-800 py-2 text-base shadow-lg focus:outline-none">
                      {tokenOptions[selectedNetwork.id].map((token, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-gray-600 text-teal-300' : 'text-gray-200'
                            }`
                          }
                          value={token}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {token.name}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                                  <FaCheck className="h-4 w-4" aria-hidden="true" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Selected Tokens Display */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center items-center">
            {selectedTokens.map((token, index) => (
              <Chip key={index} name={token.name} url={token.logoURI} index={index} />
            ))}
          </div>

          <button
            onClick={() => createBucket()}
            className="mt-6 py-3 w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-lg transition"
          >
            Create Bucket
          </button>
        </div>
      </main>
    </div>
  );
}
