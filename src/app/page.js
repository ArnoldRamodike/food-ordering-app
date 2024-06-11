import Link from 'next/link';
import Hero from '../components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeader from '../components/layout/SectionHeader';

export default function Home() {
  return (
   <>

     <Hero/>
     <HomeMenu/>
     <section className="text-center my-16" id='about'>
       <SectionHeader MainHeader={'About us'} subHeader={'Our Stroy'}/>
       <div className="text-gray-500 max-w-md mx-auto  mt-4 flex flex-col gap-4">
        <p >  
        Welcome to knechtle , where culinary convenience meets exceptional taste. Our mission is to revolutionize the way you experience food delivery by 
        connecting you to a diverse array of local restaurants and unique culinary offerings.
         Whether you are in the mood for a hearty breakfast, a nutritious lunch, a sumptuous dinner, or a late-night snack, knechtle has it all.
        </p>
        <p>
        At knechtle, we understand that great food is an essential part of a happy life. That is why we have partnered with the best local eateries, 
        ensuring that you have access to a wide variety of cuisines, from traditional favorites to exotic delicacies. Our platform is designed with you in mind, 
        offering an intuitive and user-friendly interface that makes browsing menus, placing orders, and tracking deliveries a breeze.
        </p>
        <p>
        Quality and reliability are at the heart of what we do. We take pride in working with restaurants that prioritize fresh ingredients and exceptional service. 
        Our robust delivery network ensures that your meals arrive hot and ready to enjoy, no matter where you are.
        </p>
       </div>
  
     </section>

     <section className="text-center mt-8" id='contact'>
       <SectionHeader MainHeader={'Contact us'} subHeader={'Dont hesitate'}/>
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel: 08488829"> +273 971 0004</a>
        </div>
  
     </section>

  
   </>
  );
}
