import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { WagmiConfig } from 'wagmi';
import {
  arbitrum,
  base,
  baseGoerli,
  mainnet,
  polygon,
  scrollSepolia,
} from 'viem/chains';


const projectId = '42cb45787690d40d3009bfd5c28bbbc4';

const metadata = {
  name: 'TokenTechies',
  description: 'TokenTechies',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [polygon, scrollSepolia, baseGoerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: mainnet,
  themeMode: 'dark',
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
