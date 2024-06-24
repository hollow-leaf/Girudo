import Image from 'next/image'
import { BindingWallet } from './BindingWallet'

export function ProfileInfo() {
    return (
        <div className="flex rounded-b-lg p-2 md:p-8 w-full justify-center md:justify-start glass2">
            <div className="md:flex">
                <div className='p-6'>
                    <div className="text-lg text-black">
                        <div>Hi fellows!</div>
                        <div>We are XueBuDAO!✨</div>
                        <div>A group of Students who want to support Students!</div>
                        <div>With vision to show the world that “Taiwanese Students Can Build!” We work hard to build the ultimate learning club for students to learn Web3 and to team up for Hackathon participation!</div>
                    </div>
                    <BindingWallet />
                </div>
            </div>
        </div>
    )
}