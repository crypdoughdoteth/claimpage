import type { NextPage } from 'next'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useContractRead,
        useContractWrite,
        usePrepareContractWrite,
        useAccount
      } from 'wagmi';
import config from '../contractConfig.json';
import { UseContractConfig } from 'wagmi/dist/declarations/src/hooks/contracts/useContract';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';



const contractConfig: UseContractConfig = {
  addressOrName: config.address,
  contractInterface: config.abi,
};


const Home: NextPage = () => {

    const { config } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'mint',
      args: [],
    });
  
    const { writeAsync } = useContractWrite(config);
    const [mintLoading, setMintLoading] = useState(false);
    const [mintSuccess, setMintSuccess] = useState(false);
  
    const onMintClick = async () => {
      setMintSuccess(false);
      setMintLoading(true);
      try {
        const tx = await writeAsync?.();
        const res = await tx?.wait();
        setMintSuccess(true);
      } catch (error) {
        console.error(error);
      } finally {
        setMintLoading(false);
      }
    };
  
  return (
        <div className= 'grid h-screen place-items-center p-10 bg-background bg-cover'> 
        {mintSuccess && <Confetti />}
         <div className='fixed top-5 right-5'>
            <ConnectButton/>
         </div>   
          <button 
          disabled={mintLoading} 
          onClick={onMintClick} 
          className ='mt-2 rounded font-bold bg-blue-900 p-6  text-white w-fit self-center disabled:opacity-50'>
          {mintLoading ? 'Minting!' : 'Claim POAT!' }
          </button>
        </div>
  );
};

export default Home
