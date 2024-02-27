'use client'

import React, { Children } from 'react';
import {SessionProvider} from 'next-auth/react'

const AppProvider = () => {
  return (
   <SessionProvider>
    {Children}
   </SessionProvider>
  )
}

export default AppProvider