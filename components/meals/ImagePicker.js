"use client";

import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

function ImagePicker(props) {
  const [pickedImage, setPickedImage] = useState();

  const imageInputRef = useRef();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked yet</p>
          ) : (
            <Image src={pickedImage} alt="User selected image" fill/>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={props.name}
          accept="image/png, image/jpeg, image/jpg"
          name={props.name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          onClick={handlePickClick}
          className={classes.button}
          type="button"
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
