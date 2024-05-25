import LandingPagePNG from '@/images/landing-page-bg.png'
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';

export default function Home() {
  return (
    <div className="h-screen w-screen p-[80px] ">

      <div className="absolute inset-0 blur-sm overflow-hidden">
        <Image
          src={LandingPagePNG}
          alt={"landing-page"}
          layout={"fill"}
          className="object-contain transform scale-[1.4] ml-[455px]"
        />
      </div>

      <div className="h-full border-[3px] border-adpro-000 rounded-lg overflow-hidden relative flex flex-row justify-between bg-[#e7f5fb]">
        <div className='w-full flex flex-col gap-3 items-start pl-9 justify-center'>
          <text className="font-light text-7xl font-cormorant text-adpro-900">Ourda!lydose</text>

          <div className='flex flex-col text-[18px] font-medium'>
            <text className='opacity-65'>Discover your daily beauty ritual with ourda!lydose,</text>

            <div className='flex flex-row gap-1'>
              <text className='opacity-65'>your ultimate</text>
              <text className='font-semibold bg-gradient-to-r from-adpro-blue-800 to-adpro-green-500 text-transparent bg-clip-text'>skincare subscription box </text>
              <text className='opacity-65'>destination!</text>
            </div>
          </div>

          <button className='text-[18px] flex flex-row items-center gap-2 mt-3 border-[2px] border-adpro-700 text-adpro-700 px-9 py-[10px] hover:text-adpro-000 hover:bg-adpro-600 hover:border-adpro-600 ease-in-out duration-200'>
            Shop now 
            <HiArrowNarrowRight />
          </button>
        </div>

        <div className="w-full relative h-[550px] flex items-center justify-center">
            <div className="w-full h-full relative">
              <Image
                src={LandingPagePNG}
                alt={"landing-page"}
                layout={"fill"}
                className="object-contain flex self-center mb-[125px]"
              />
            </div>
          </div>
      </div>
    </div>
  );
}
