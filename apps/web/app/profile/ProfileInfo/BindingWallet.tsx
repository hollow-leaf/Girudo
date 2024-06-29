import Image from 'next/image'
import { Button } from '../../components/common/button'
import { useLoginStore } from '@/stores/useUserStore';
import { useState } from 'react';
import { jwtToAddress } from '@mysten/zklogin';
import { formatAddress } from '@/lib/utils';

export function BindingWallet() {

    const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

    const [ethAddr, setEthAddr] = useState<string>("")
    const [suiAddr, setSuiAddr] = useState<string>("")
    const [solanaAddr, setSolanaAddr] = useState<string>("")


    const chain = ["/ethereum.png", "/sui.png", "/Solana_logo.png"]
    const addresses = [ethAddr, suiUserInfo.jwt == "" || suiUserInfo.jwt == undefined ? suiAddr : jwtToAddress(suiUserInfo.jwt, suiUserInfo.salt), solanaAddr]

    return (
        <div>
            <div className='p-2 text-3xl text-medium text-cBlue'>Wallet Address</div>
            {chain.map((chain, index) => {
                return (
                    <div key={chain} className="flex w-64 md:w-96 items-center px-4 my-2">
                        <Image
                        className='my-1 glass border-2 border-cBlue/60 rounded-full'
                        src={chain}
                        width={40}
                        height={40}
                        alt="Picture of the author"
                        />
                        <div className='h-[44px] w-[2.5px] bg-cBlue/40 mx-4'></div>
                        <div className='flex w-full text-black'>
                            {addresses[index] == "" ? <Button name='Bind' handler={()=>{}}></Button>:formatAddress(addresses[index] as string)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}