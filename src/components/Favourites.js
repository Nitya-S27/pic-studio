import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import "./Favourites.scss";

const Favourites = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID") || "";
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);
  const [isBroken, setIsBroken] = useState();

  useEffect(() => {
    if (userID && userID.trim().length) {
      dispatch(userActions.addUID(userID));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getFavs = async () => {
      console.log(userID);
      if (userID) {
        const docRefGet = doc(db, "favs", userID);
        const docSnap = await getDoc(docRefGet);
        let userFavs = [];
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          userFavs = [...docSnap.data().image];
          console.log(userFavs);
        } else {
          console.log("No favourites added!");
        }
        setFavs([...userFavs]);
      }
    };

    getFavs();
  }, []);

  const removeFavouriteHandler = async (id) => {
    if (userID) {
      const docRefGet = doc(db, "favs", userID);
      const docSnap = await getDoc(docRefGet);
      let userFavs = [];
      if (docSnap && docSnap.exists()) {
        console.log(docSnap.data());
        console.log("Document data:", docSnap.data());
        userFavs = [...docSnap.data().image];
      } else {
        console.log("No such document!");
      }
      const filteredFavs = userFavs.filter((favs) => favs.imageID !== id);
      await setDoc(doc(db, "favs", userID), {
        image: [...filteredFavs],
      });
      alert("Removed From Favourite");
      setFavs(filteredFavs);
    } else {
      navigate("/login");
    }
    console.log("Removed From Favourite");
  };

  return (
    <div className="favouritesWrapper">
      <h1>Favourites</h1>
      <div className="favWrapper">
        {favs.length !== 0 ? (
          favs.map((fav) => (
            <div className="favContainer" key={fav.imageID}>
              <img src={fav.imageURL} alt="error.png" />
              <div className="overlay">
                <button
                  onMouseOver={() => setIsBroken(fav.imageID)}
                  onClick={() => {
                    removeFavouriteHandler(fav.imageID);
                  }}
                >
                  {isBroken === fav.imageID ? (
                    <FaHeartBroken className="icon" />
                  ) : (
                    <FaHeart className="icon" />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Add something to favourites</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
