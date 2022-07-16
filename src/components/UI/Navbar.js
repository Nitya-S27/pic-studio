import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import "./Navbar.scss";
import { userActions } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(userActions.removeUID());
  };

  return (
    <div className="navbarWrapper">
      <div className="navbarBrand">
        <NavLink to="/">
          <img src="assets/PS.png" alt="logo.png" />
        </NavLink>
      </div>
      <ul className="navLinkWrapper">
        {userID && userID.trim().length ? (
          <div className="signIn navLinks">
            <li>
              <NavLink exact activeClassName="activeLink" to="/favourites">
                Favourites
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                onClick={logoutHandler}
                activeClassName="activeLink"
                to="/"
              >
                Log Out
              </NavLink>
            </li>
            <li>
              <img
                style={{ width: "50px", height: "50px", borderRadius: "100%" }}
                src="https://picsum.photos/200/300"
                alt="error.png"
              />
            </li>
          </div>
        ) : (
          <div className="signOut navLinks">
            <li>
              <NavLink exact activeClassName="activeLink" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="activeLink" to="/signup">
                Sign Up
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
