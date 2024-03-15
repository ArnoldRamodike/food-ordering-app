'use client'

import React, { useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";

const OrdersPage = () => {

    const {loading, data} = useProfile();
    const [redirectToItem, setRedirectToItem] = useState(false);
    

    if (redirectToItem) {
        return redirect('/users');
    }

    if (loading) {
        return 'Loading User Info ...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

  return (
    <section className='max-w-2xl mx-auto mt-8'>
        <UserTabs isAdmin={true} />
        orders
    </section>
  )
}

export default OrdersPage