import React from 'react';

const TokenTechiesTreeDiagram = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-teal-700 text-white px-4 py-16">
      {/* Heading */}
      <h1 className="text-5xl font-bold mb-6">
        TokenTechies: A Growth-Oriented Approach to Crypto Investment
      </h1>

      {/* Description */}
      <p className="text-xl text-center max-w-3xl mb-12">
        Think of TokenTechies as a tree that grows your wealth by starting with a solid foundation, diversifying branches, and finally producing the leaves of profits.
      </p>

      {/* Tree Diagram */}
      <div className="relative w-full max-w-5xl bg-neutral-800 p-10 rounded-lg shadow-xl">
        {/* Trunk */}
        <div className="flex flex-col items-center mt-12">
          <div className="bg-gray-600 w-10 h-48"></div>
          <div className="bg-purple-500 p-6 rounded-lg w-40 h-40 flex items-center justify-center mt-4">
            <span className="font-bold text-lg">Create Buckets</span>
          </div>
          <p className="text-gray-300 text-sm text-center mt-2">
            The structure that organizes your investments into manageable buckets.
          </p>
        </div>

        {/* Branches */}
        <div className="flex justify-around items-start mt-12">
          <div className="text-center">
            <div className="bg-green-500 p-4 rounded-lg w-28 h-28 flex items-center justify-center mb-2">
              <span className="font-bold text-md">Bucket 1</span>
            </div>
            <p className="text-gray-300 text-sm">Diversification strategy in this bucket.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500 p-4 rounded-lg w-28 h-28 flex items-center justify-center mb-2">
              <span className="font-bold text-md">Bucket 2</span>
            </div>
            <p className="text-gray-300 text-sm">Another diversified bucket with selected tokens.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500 p-4 rounded-lg w-28 h-28 flex items-center justify-center mb-2">
              <span className="font-bold text-md">Bucket 3</span>
            </div>
            <p className="text-gray-300 text-sm">Yet another diversified option for your strategy.</p>
          </div>
        </div>

        {/* Leaves */}
        <div className="flex justify-around mt-12">
          <div className="text-center">
            <div className="bg-yellow-500 p-6 rounded-full w-36 h-36 flex items-center justify-center mb-2">
              <span className="font-bold text-lg">Profit 1</span>
            </div>
            <p className="text-gray-300 text-sm">Investment growth from Bucket 1.</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500 p-6 rounded-full w-36 h-36 flex items-center justify-center mb-2">
              <span className="font-bold text-lg">Profit 2</span>
            </div>
            <p className="text-gray-300 text-sm">Investment growth from Bucket 2.</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500 p-6 rounded-full w-36 h-36 flex items-center justify-center mb-2">
              <span className="font-bold text-lg">Profit 3</span>
            </div>
            <p className="text-gray-300 text-sm">Investment growth from Bucket 3.</p>
          </div>
        </div>
        
        {/* Connective Lines */}
        <div className="absolute inset-x-0 top-32">
          <div className="border-l-2 border-gray-600 h-32 absolute left-1/3 top-0" />
          <div className="border-l-2 border-gray-600 h-32 absolute left-1/2 top-0" />
          <div className="border-l-2 border-gray-600 h-32 absolute right-1/3 top-0" />
        </div>
      </div>

      {/* Call to Action */}
      <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-black font-semibold rounded-lg transition mt-12">
        Grow Your Portfolio with TokenTechies
      </button>
    </div>
  );
};

export default TokenTechiesTreeDiagram;
