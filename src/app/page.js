import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeader from '@/components/layout/SectionHeader';

export default function Home() {
  return (
   <>

     <Hero/>
     <HomeMenu/>
     <section className="text-center my-16">
       <SectionHeader MainHeader={'About us'} subHeader={'Our Stroy'}/>
       <div className="text-gray-500 max-w-md mx-auto  mt-4 flex flex-col gap-4">
        <p >  
            This tutorial is designed for beginners and will teach you the basics of building a food ordering style of apps with next.js 14. 
            By the end of this tutorial, you will have a working restaurant page that you can use for your portfolio.
        </p>
        <p>
            This tutorial is designed for beginners and will teach you the basics of building a food ordering style of apps with next.js 14. 
            By the end of this tutorial, you will have a working restaurant page that you can use for your portfolio.
        </p>
        <p>
            This tutorial is designed for beginners and will teach you the basics of building a food ordering style of apps with next.js 14. 
        </p>
       </div>
  
     </section>

     <section className="text-center mt-8">
       <SectionHeader MainHeader={'Contact us'} subHeader={'Dont hesitate'}/>
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel: 08488829"> +084 9978787 8u</a>
        </div>
  
     </section>

  
   </>
  );
}
