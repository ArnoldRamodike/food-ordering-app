'use client'

import React, { useState }  from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";

const Users = () => {
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
    <div>
      <UserTabs isAdmin={true} />
      users
    </div>
  )
}

export default Users