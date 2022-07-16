import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import "./auth.scss";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "";

  useEffect(() => {
    if (userID && userID.trim().length) {
      dispatch(userActions.addUID(userID));
      navigate("/");
      alert("already logged in");
    }
  }, []);

  const inputChangeHandler = (event) => {
    setLoginInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(loginInput);
    await signInWithEmailAndPassword(
      auth,
      loginInput.email,
      loginInput.password
    )
      .then((userCredential) => {
        console.log("Successfully logged in");
        console.log(userCredential);
        localStorage.setItem("userID", userCredential.user.uid);
        dispatch(userActions.addUID(userCredential.user.uid));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formWarpper loginWrapper">
      <form onSubmit={formSubmitHandler}>
        <p>Login</p>
        <label htmlFor="email">E-Mail</label>
        <input
          onChange={inputChangeHandler}
          type="email"
          value={loginInput.email}
          name="email"
          autoComplete="off"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={inputChangeHandler}
          type="password"
          value={loginInput.password}
          name="password"
          autoComplete="off"
          required
        />
        <button type="submit">Login</button>
        <Link to="/signup">New User? SignUp yourself</Link>
      </form>
    </div>
  );
};

export default Login;
