'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import UserTabs from '@/components/layout/UserTabs';
import EditableImage from '@/components/layout/EditableImage';
import React, { useEffect, useState } from 'react'

export default function UserForm({user, onSave}) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image ||'');
    const [phone, setPhone] = useState(user?.phone ||'');
    const [streetAddress, setstreetAddress] = useState(user?.streetAddress ||'');
    const [city, setCity] = useState(user?.city ||'');
    const [postalCode, setPostalCode] = useState(user?.postalCode ||'');
    const [country, setCountry] = useState(user?.country || '');


  return (
    <div className='flex gap-4'>
    <div>
      <div className='p-2 rounded-lg relative max-w-[120px]'>
        <EditableImage link={image} setLink={setImage}/>
        
      </div>
    </div>
     
    <form className='grow' onSubmit={ev => onSave(ev , {name: userName, image, phone, country, city, streetAddress, postalCode})}>
        <label>First and last name</label>
        <input type='text' placeholder='First and last Name' value={userName} onChange={ev => setUserName( ev.target.value)}/>
        <input type='email' placeholder='email' disabled={true} value={user.email}/>
        <input type='tel' placeholder='Phone number' value={phone} onChange={ev => setPhone(ev.target.value)} />
        <input type='text' placeholder='Street address'  value={streetAddress} onChange={ev => setstreetAddress(ev.target.value)} />
        <div className='flex gap-2 py-2'> 
          <input type='text' placeholder='City'  value={city} onChange={ev => setCity(ev.target.value)}  style={{margin: '0'}}/>
          <input type='text' placeholder='Postal code'  value={postalCode} onChange={ev => setPostalCode(ev.target.value)} style={{margin: '0'}}/>
        </div>
        
        <input type='text' placeholder='Country'  value={country} onChange={ev => setCountry(ev.target.value)} />

        <button type='submit'>Save</button>
    </form>
   </div>
  )
}

