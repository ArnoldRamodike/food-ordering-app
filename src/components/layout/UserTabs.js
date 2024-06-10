'use client'

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProfile } from './UseProfile';

const UserTabs = ({isAdmin}) => {
    const path = usePathname();
    const {loading, data} = useProfile();
  return (
    <div className='flex mx-auto gap-2 tabs justify-center'>
    <Link className={path ==='/profile' ? 'active' : ''} href={'/profile'}>Profile </Link>
    { isAdmin && data.admin ? (
      <>
        <Link className={path ==='/categories' ? 'active' : ''} href={'/categories'}>Categories</Link>
        <Link className={path.includes('menu-items') ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
        <Link className={path.includes('users') ? 'active' : ''} href={'/users'}>Users</Link>
        <Link className={path ==='/orders' ? 'active' : ''} href={'/orders'}>Orders</Link>
      </>
    ): (null)

    }
  </div>
  )
}

export default UserTabs