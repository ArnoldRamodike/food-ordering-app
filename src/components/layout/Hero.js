import React from 'react';
import Right from '../icons/Right';
import {  useRouter } from 'next/navigation';
import Link from 'next/link';


function Hero() {
  // const router = useRouter();
  return (
    <section className="hero mt-4">
      <div className="py-12 ">
        <h1 className="text-4xl font-semibold">Everything is <br/> Better with a <br/>
          <span className="text-primary"> knechtle </span> 
        </h1>
        <p className="my-6 text-gray-500 text-sm">
        knechtle is the missisn piece that makes everything 
          complete on a work day
        </p>
        <div className="flex gap-4 text-sm">
            <Link href={'/menu'} 
            className=" flex justify-center bg-primary text-white items-center gap-4 px-10 py-2 rounded-full after:">
              Order Now
              <Right/>
            </Link>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn More
              <Right/>
              </button>
        </div>
      </div>
       
        <div className=" relative">
          <img src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'Pizza'} />
        </div>
       
    </section>
  )
}

export default Hero