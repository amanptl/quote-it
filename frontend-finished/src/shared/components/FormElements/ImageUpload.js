import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);


  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

async    function onChangeFile(event, fileIsValid) {
  event.preventDefault();
    return new Promise(
      (res,rej) => {
        if(fileIsValid){
          const payload = new FormData();
          payload.append('image', event.target.files[0]);
          
          const xhr = new XMLHttpRequest();
          
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  res(xhr.responseText)
              }
              
          }
           xhr.onerror=()=>{
             rej(undefined)
           }

          xhr.open('POST', 'http://localhost:4000/predict');
          xhr.send(payload);
        }else{
          rej(undefined)
        }
      }
    )
        
        
    }

  const pickedHandler = async (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    let caption='';
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      try{
        caption= await onChangeFile(event, fileIsValid)
      }catch{
        caption='';
      }
     
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    
    props.onInput(props.id, pickedFile, fileIsValid, caption);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
