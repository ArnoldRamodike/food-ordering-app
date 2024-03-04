import React from 'react'

const SuccessBox = ({children}) => {
  return (
     <div className='text-center bg-green-200 p-4 rounded-lg border-4 border-green-300'>
           {children}
    </div>
  )
}

export default SuccessBox