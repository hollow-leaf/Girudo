import Image from 'next/image'
import { Button } from '../../components/common/button'

export function BindingWallet() {

    const chain = ["/ethereum.png", "/sui.png", "/ton-logo.png"]
    const addresses = ["", "0xA", ""]

    return (
        <div>
            <div className='p-4 text-3xl text-medium text-cBlue'>Wallet Address</div>
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
                        <div className='flex w-full text-black justify-center'>
                            {addresses[index]=="" ? <Button name='Bind' handler={()=>{}}></Button>:addresses[index]}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}