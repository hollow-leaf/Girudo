import Image from 'next/image'

export function DapInfo() {
    return (
        <div className="flex rounded-b-lg p-2 md:p-8 w-full justify-center md:justify-start glass2">
            <div className="md:flex">
                <div>
                    <div className="flex justify-center">
                        <Image
                        className='my-1 glass border-2 border-cBlue rounded-full'
                        src="/girudo.png"
                        width={200}
                        height={200}
                        alt="Picture of the author"
                        />
                    </div>
                    <div className="text-center text-black text-2xl md:text-4xl">XueBuDAO</div>
                    <div className="text-center text-black/60 text-sm md:text-lg">Created June 2024</div>
                </div>
                <div className='p-6'>
                    <div className="text-lg text-black">
                        <div>Hi fellows!</div>
                        <div>We are XueBuDAO!✨</div>
                        <div>A group of Students who want to support Students!</div>
                        <div>With vision to show the world that “Taiwanese Students Can Build!” We work hard to build the ultimate learning club for students to learn Web3 and to team up for Hackathon participation!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}