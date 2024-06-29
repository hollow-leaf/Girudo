import Image from 'next/image'
import { BindingWallet } from './BindingWallet'

export function ProfileInfo() {
    return (
        <div className="flex rounded-b-lg p-2 md:p-8 w-full justify-center md:justify-start glass2">
            <div className="md:flex">
                <div className='p-6'>
                    <BindingWallet />
                </div>
            </div>
        </div>
    )
}