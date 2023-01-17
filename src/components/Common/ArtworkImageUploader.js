import React from 'react';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import { useState } from 'react';

export default function ArtworkImageUploader({ setImageList }) {
  const [isUploaded, setIsUploaded] = useState([]);

  const uploadImage = (event) => {
    setIsUploaded([]);
    const length = event.target.files.length;
    setImageList(event.target.files);
    let i = 0;
    while (i < length && i < 9) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const uploaded_image = reader.result;
        setIsUploaded((prev) => {
          if (prev.indexOf(uploaded_image) === -1) return [...prev, uploaded_image];
          else return prev;
        });
      });
      reader.readAsDataURL(event.target.files[i]);
      i++;
    }
  };

  // const updateImg = (event, index) => {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     const uploaded_image = reader.result;
  //     setIsUploaded((prev) => {
  //       if (prev.indexOf(uploaded_image) === -1) {
  //         let newList = [...prev];
  //         newList[index] = uploaded_image;
  //         return newList;
  //       }
  //       return prev;
  //     });
  //   });
  //   reader.readAsDataURL(event.target.files[0]);
  // };

  const displayDefaultUpload = () => {
    return (
      <div className="border w-32 h-32">
        <label
          htmlFor={`img-${isUploaded.length + 1}`}
          className=" flex text-lg text-blue-500 hover:cursor-pointer justify-center items-center h-full ">
          <FileUploadIcon />
        </label>
        <input
          id={`img-${isUploaded.length + 1}`}
          onChange={(event) => uploadImage(event)}
          className="hidden"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          multiple
        />
      </div>
    );
  };

  const displayUploadedImages = () => {
    return (
      <>
        {isUploaded.map((pic, i) => {
          return (
            <div key={i} className="border w-32 h-32 my-2 mx-2">
              <label
                // htmlFor={`img-${isUploaded.indexOf(pic)}`}
                className=" flex text-lg text-blue-500 justify-center items-center h-full ">
                <img className="w-32 h-32" src={pic} alt="" />
              </label>
              <input
                id={`img-${isUploaded.indexOf(pic)}`}
                // onChange={(event) => updateImg(event, isUploaded.indexOf(pic))}
                className="hidden"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
              />
            </div>
          );
        })}
        {isUploaded.length < 9 ? displayDefaultUpload() : ''}
      </>
    );
  };

  return (
    <div className="w-full flex justify-evenly p-5 flex-wrap lg:max-w-2xl ml-2 my-3 border">
      {isUploaded.length === 0 ? displayDefaultUpload() : displayUploadedImages()}
    </div>
  );
}
