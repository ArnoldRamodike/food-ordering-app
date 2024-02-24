import React from 'react';
import Right from '../icons/Right';


function Hero() {
  return (
    <section className="hero ">
      <div className="py-12 ">
        <h1 className="text-4xl font-semibold">Everything is <br/> Better with a <br/>
          <span className="text-primary"> pizza </span> 
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missisn piece that makes everything 
          complete on a work day
        </p>
        <div className="flex gap-4 text-sm">
            <button className="bg-primary text-white flex items-center gap-4 px-4 py-2 rounded-full uppercase after:">
              Order Now
              <Right/>
            </button>
            <button className="flex gap-2 py-2 text-gray-600 font-semibold">
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