'use client'

import Image from 'next/image'
import { UploadButton } from '../../utils/uploadthing'
import React from 'react'

const ImageUpload = ({link, setLink}) => {
  return (
    <>
    <UploadButton 
      endpoint='imageUploader'
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        setLink(res[0].url);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      />

      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
</>
  )
}

export default ImageUpload