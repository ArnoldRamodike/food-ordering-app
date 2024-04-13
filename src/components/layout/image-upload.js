'use client'

import { UploadButton } from '../../utils/uploadthing'
import React from 'react'

const ImageUpload = () => {
  return (
    <UploadButton 
      endpoint='imageUploader'
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      />

  )
}

export default ImageUpload