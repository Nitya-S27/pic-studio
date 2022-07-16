import React, { useState, useEffect, useRef } from "react";
import { createApi } from "unsplash-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import ImageForm from "./ImageForm";
import { userActions } from "../store/userSlice";
import ImageItem from "./ImageItem";


const ImageList = () => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID") || "";
  const navigate = useNavigate();
  const unsplash = createApi({
    accessKey: "f4mbYGxewr6KNYVHLpFEGz0Ag-wwjtMskDsUVRZH6TM",
  });
  useEffect(() => {
    if (userID && userID.trim().length) {
      dispatch(userActions.addUID(userID));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    unsplash.photos
      .list({
        page: 1,
        perPage: 29,
        orientation: "landscape",
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setImageList(res.response.results);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const uid = useSelector((state) => state.user) || "";

  const onFormSubmit = (q) => {
    window.scrollTo(0, 500);
    setIsLoading(true);
    unsplash.search
      .getPhotos({
        query: q,
        page: 1,
        perPage: 100,
        orientation: "landscape",
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.response.results);
        setImageList(res.response.results);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const addToFavHandler = async (id, url) => {
    if (uid) {
      const docRefGet = doc(db, "favs", uid);
      const docSnap = await getDoc(docRefGet);
      let userFavs = [];
      if (docSnap && docSnap.exists()) {
        console.log(docSnap.data());
        console.log("Document data:", docSnap.data());
        userFavs = [...docSnap.data().image];
      } else {
        console.log("No such document!");
      }
      userFavs.push({ imageID: id, imageURL: url, isLiked: true });
      await setDoc(doc(db, "favs", uid), {
        image: [...userFavs],
      });
      // alert("ADDED TO FAVOURITES");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <ImageForm onSubmit={onFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ImageItem imageList={imageList} addToFavHandler={addToFavHandler} />
      )}
    </div>
  );
};

export default ImageList;
