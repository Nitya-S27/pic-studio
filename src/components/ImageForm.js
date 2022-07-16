import React, { useState } from "react";
import "./ImageForm.scss";

const ImageForm = (props) => {
  const [searchText, setSearchText] = useState("");

  const inputChangeHnadler = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(searchText);
    props.onSubmit(searchText);
  };
  return (
    <form className="formWrapper" onSubmit={formSubmitHandler}>
      <h1>PicStudio</h1>
      <p>Get your favourite photos at one place!</p>
      <div className="inputWrapper">
        <input
          id="searchText"
          value={searchText}
          name="searchText"
          required
          onChange={inputChangeHnadler}
          placeholder="Search Here!"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default ImageForm;
