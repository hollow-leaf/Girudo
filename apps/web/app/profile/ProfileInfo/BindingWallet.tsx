import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '../../components/common/button';
import { useLoginStore } from '@/stores/useUserStore';
import { useState } from 'react';
import { jwtToAddress } from '@mysten/zklogin';
import { formatAddress } from '@/lib/utils';
import {  useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount} from 'wagmi';

export function BindingWallet() {
  const { suiUserInfo, userInfo, loginByJwt } = useLoginStore();
  const { address:ethAddr, isConnected } = useAccount();
  const [suiAddr, setSuiAddr] = useState<string>('');
  const { publicKey } = useWallet();
  const chain = ['/ethereum.png', '/sui.png', '/Solana_logo.png'];
  const addresses = [
    ethAddr,
    suiUserInfo.jwt == '' || suiUserInfo.jwt == undefined
      ? suiAddr
      : jwtToAddress(suiUserInfo.jwt, suiUserInfo.salt),
    publicKey,
  ];

  const walletButtonRef = useRef<HTMLDivElement>(null);

    const handleBindClick = () => {
        if (walletButtonRef.current) {
            walletButtonRef.current.querySelector('button')?.click();
        }
    };

    const EthWalletButtonRef = useRef<HTMLDivElement>(null);

    const handleEthBindClick = () => {
        if (EthWalletButtonRef.current) {
          EthWalletButtonRef.current.querySelector('button')?.click();
        }
    };

  return (
    <div>
      <div className='p-2 text-3xl text-medium text-cBlue'>Wallet Address</div>
      <div key={chain[0]} className='flex w-64 md:w-96 items-center px-4 my-2'>
        <Image
          className='my-1 glass border-2 border-cBlue/60 rounded-full'
          src={'/ethereum.png'}
          width={40}
          height={40}
          alt='Picture of the author'
        />
        <div className='h-[44px] w-[2.5px] bg-cBlue/40 mx-4'></div>
        <div className='flex w-full text-black'>
          {!isConnected  ? (
            <>
            <Button name='Bind' handler={handleEthBindClick} />
            <div ref={EthWalletButtonRef} style={{ display: 'none' }}>
              <ConnectButton />
            </div>
        </>
          ) : (
            formatAddress(ethAddr as string)
          )}
        </div>
      </div>
      <div
        key={'/sui.png'}
        className='flex w-64 md:w-96 items-center px-4 my-2'
      >
        <Image
          className='my-1 glass border-2 border-cBlue/60 rounded-full'
          src={'/sui.png'}
          width={40}
          height={40}
          alt='Picture of the author'
        />
        <div className='h-[44px] w-[2.5px] bg-cBlue/40 mx-4'></div>
        <div className='flex w-full text-black'>
          {addresses[1] == '' ? (
            <Button name='Bind' handler={() => {}}></Button>
          ) : (
            formatAddress(addresses[1] as string)
          )}
        </div>
      </div>
      <div
        key={'/Solana_logo.png'}
        className='flex w-64 md:w-96 items-center px-4 my-2'
      >
        <Image
          className='my-1 glass border-2 border-cBlue/60 rounded-full'
          src={'/Solana_logo.png'}
          width={40}
          height={40}
          alt='Picture of the author'
        />
        <div className='h-[44px] w-[2.5px] bg-cBlue/40 mx-4'></div>
        <div className='flex w-full text-black'>
          {!publicKey ? (
            <>
            <Button name='Bind' handler={handleBindClick} />
            <div ref={walletButtonRef} style={{ display: 'none' }}>
                <WalletMultiButton />
            </div>
        </>
          ) : (
            formatAddress(publicKey.toBase58())
          )}
        </div>
      </div>
    </div>
  );
}
