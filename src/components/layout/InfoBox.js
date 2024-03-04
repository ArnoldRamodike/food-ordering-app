import React from 'react'

const InfoBox = ({children}) => {
  return (
    <div className='text-center bg-blue-200 p-4 rounded-lg border-4 border-green-300'>
     {children}
    </div>
  )
}

export default InfoBox