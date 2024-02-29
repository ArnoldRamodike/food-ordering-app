'use client'

import {useState} from "react";
import Image from 'next/image';
import Link from 'next/link';
import {signIn} from "next-auth/react";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState(false)

    async function handleFormSbumit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        setError(false);

        await signIn('credentials', {email, password, callbackUrl:'/'});

    }

  return (
    <section className='mt-8 text-center'>
    <h1 className="text-centre text-primary text-4xl ">
       Login
   </h1>

   <form className="block max-w-xs mx-auto" onSubmit={handleFormSbumit}>
        <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress}/>
        <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress}/>

        <button type="submit" disabled={loginInProgress}>Login</button>

        <div className=" my-4 text-center text-gray-500"> or login with Provider</div>
            <button type="button" onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center" >
            <Image img={'/pizza.png'} alt={'google'} width={32} height={32} />
            Login with google
            </button>
       <div className='text-center my-4 border-t pt-4'>

         No account ?{' '}
        <Link className='underline ' href={'/register'}>Register here &raquo;</Link>
       </div>
    </form>
   </section>
  )
}

export default login