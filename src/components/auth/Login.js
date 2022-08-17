import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./auth.scss";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID") || "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userID && userID.trim().length) {
      dispatch(userActions.addUID(userID));
      navigate("/");
      toast.info("Already logged in");
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
    setIsLoading(true);
    event.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      loginInput.email,
      loginInput.password
    )
      .then((userCredential) => {
        setIsLoading(false);
        localStorage.setItem("userID", userCredential.user.uid);
        dispatch(userActions.addUID(userCredential.user.uid));
        toast.success("Logged in successfully");
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Login Failed!");
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
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
        <Link to="/signup">New User? SignUp yourself</Link>
      </form>
    </div>
  );
};

export default Login;
