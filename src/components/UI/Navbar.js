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
              <NavLink
                exact="true"
                className={(navData) =>
                  navData.isActive ? "activeLink" : "none"
                }
                to="/favourites"
              >
                Favourites
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                onClick={logoutHandler}
                className={(navData) =>
                  navData.isActive ? "activeLink" : "none"
                }
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
              <NavLink
                exact="true"
                className={(navData) =>
                  navData.isActive ? "activeLink" : "none"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                exact="true"
                className={(navData) =>
                  navData.isActive ? "activeLink" : "none"
                }
                to="/signup"
              >
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
