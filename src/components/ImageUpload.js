import React, {useCallback, useState} from 'react'
import { TbPhotoPlus } from "react-icons/tb"
import { Image, Transformation } from 'cloudinary-react';

const ImageUpload = () => {
    const [image, setImage] = useState('');
    const cloudName = process.env.REACT_APP_CLOUDINARY_NAME;
    const apiKey = '843355578652474';
    const apiSecret = '5GMm6ulcl8EKhe7cMQ0vQDXxwwE';
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET

    const handleUpload = (event) => {
      const file = event.target.files[0];
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
  
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.secure_url) {
                console.log(data);
                setImage(data.secure_url);
            }
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleUpload} />
        {image && (
          <div>
            <img src={image} crop="scale" />
          </div>
        )}
      </div>
    );
}

export default ImageUpload