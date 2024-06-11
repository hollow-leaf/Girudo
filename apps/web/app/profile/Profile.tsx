import Image from 'next/image'

export function Profile() {
    return (
        <div className="w-64 max-h-[700px] my-6 md:mx-6 md:my-0 rounded-lg glass">
            <div className="flex justify-center px-4 py-8">
                <div className="space-y-6 text-black">
                    <Image
                    src="/task0.png"
                    width={180}
                    height={180}
                    alt="Picture of the author"
                    className='rounded-full border-cBlue border-4 w-[100px] h-[100px] md:w-[180px] md:h-[180px]'
                    />
                    <div>
                        <div className="text-center md:text-2xl">Brother Jake</div>
                        <div className="text-center text-black/60 text-xs md:text-sm">Joined March 2022</div>
                        <div className="text-center text-cBlue text-sm md:text-lg">6666 GDO</div>
                    </div>
                </div>
            </div>
        </div>
    )
}