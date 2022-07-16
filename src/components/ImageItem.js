import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./ImageItem.scss";

const ImageItem = (props) => {
  const [isFav, setIsFav] = useState("");

  return (
    <div className="imageWrapper">
      {props.imageList.map((image, index) => {
        return (
          <div className="imageContainer" key={image.id}>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              loading="lazy"
            />
            <div className="overlay">
              {isFav && isFav === image.id ? (
                <p>Added to Favourites!!!</p>
              ) : (
                <button
                  onClick={() => {
                    props.addToFavHandler(image.id, image.urls.small);
                    setIsFav(image.id);
                  }}
                >
                  <FaHeart className="icon" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageItem;
