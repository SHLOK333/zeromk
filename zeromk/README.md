## Finn
Finn is a Web3 version of smallcase with token investment UX improvement in the DeFi space. Instead of micro-management of the portfolio, we provide a simple interface to create a bucket of tokens and invest in them in a single transaction. Consider it as mutual funds where the deposited amount will be invested in tokens with respective allocations. Later, it can be withdrawn according to the current market price. Choose better PNL doing buckets, invest, and grow with strategies!

### How are we using 1inch?
Using `1inch Fusion API`, we are swapping the investment into prospective token allocation on `Arbitrum One`, `Base`, and `Polygon Mainnet`. Later, it will be used to withdraw the funds from the bucket. 

## Prerequisites & Manual Setup

Every user must have a Metamask wallet to interact with this product. Check out how to create a Metamask wallet from [here](https://metamask.io). 

Follow the instructions for the local environment: The user must have Node.js and npm to run this platform. Just download Node.js from [here](https://nodejs.org/en/download/).

### Local Setup Instructions

**Clone the repo via CLI:**

```sh
git clone https://github.com/neel-ds/finn.git 
cd finn
```

**Install the required packages:**

```sh
npm install
yarn install   #or
pnpm install   #or
```

**Add required environment variables mentioned in `.env.example` file**

```sh
touch .env  #Paste env variables in this file and your values
```

**In the project directory, you can run:**

```sh
npm run dev
yarn dev   #or
pnpm dev   #or
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
