import React from "react";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import { useState } from "react";


const uploadImage = (event, setIsUploaded) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;

    setIsUploaded((prev) => {
      
      if (prev.indexOf(uploaded_image) === -1)
        return [...prev, uploaded_image]
      else
        return prev
    });
  });
  reader.readAsDataURL(event.target.files[0]);
};



const updateImg = (event,setIsUploaded,index)=>{
  
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    setIsUploaded((prev) => {
    
      if (prev.indexOf(uploaded_image) === -1){
        let newList = [...prev]
        newList[index] = uploaded_image
        return newList
      }
      return prev
    
    });
  });
  reader.readAsDataURL(event.target.files[0]);
}




const displayDefaultUpload = (isUploaded,setIsUploaded) => {
  return (
    <div className="border w-32 h-32">
      <label
        htmlFor={`img-${isUploaded.length+1}`}
        className=" flex text-lg text-blue-500 hover:cursor-pointer justify-center items-center h-full "
      >
        <FileUploadIcon />
      </label>
      <input
        id={`img-${isUploaded.length+1}`}
        onChange={(event) => uploadImage(event, setIsUploaded)}
        className="hidden"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
      />
    </div>
  )
}

const displayUploadedImages = (isUploaded, setIsUploaded) => {
  return (
    <>
      {isUploaded.map((pic) => {
        return (
          <div className="border w-32 h-32">
            <label
              htmlFor={`img-${isUploaded.indexOf(pic)}`}
              className=" flex text-lg text-blue-500 hover:cursor-pointer justify-center items-center h-full "
            >
              <img
                className="cursor-pointer w-32 h-32"
                src={pic}
                alt=""
              />
            </label>
            <input
              id={`img-${isUploaded.indexOf(pic)}`}
              onChange={(event) => updateImg(event, setIsUploaded,isUploaded.indexOf(pic))}
              className="hidden"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
        );
      })}
      {isUploaded.length < 9 ? displayDefaultUpload(isUploaded,setIsUploaded) : ""}
    </>
  )
}



export default function ArtworkImageUploader() {
  const [isUploaded, setIsUploaded] = useState([]);

  return (
    <div className="w-full flex justify-evenly p-5 flex-wrap max-w-md ml-2 my-3 border">
      {isUploaded.length === 0 ? displayDefaultUpload(isUploaded,setIsUploaded) : displayUploadedImages(isUploaded, setIsUploaded)}
    </div>
  )
}
