import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { toast } from "react-toastify";
import "./auth.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    username: "",
    password: "",
    email: "",
  });

  const userID = localStorage.getItem("userID") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID && userID.trim().length) {
      dispatch(userActions.addUID(userID));
      navigate("/");
      alert("already logged in");
    }
  }, []);

  const inputChangeHandler__s1 = (event) => {
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const signupHandler__s1 = async (event) => {
    event.preventDefault();
    console.log(input);
    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCreds) => {
        console.log(userCreds.user);
        if (userCreds.user.uid !== null) {
          setStep(2);
          localStorage.setItem("userID", userCreds.user.uid);
          dispatch(userActions.addUID(userCreds.user.uid));
          toast.success("Signed up successfully");
          navigate("/");
        } else {
          console.log("NULL uid");
        }
      })
      .catch((err) => toast.error("Signup Failed!"));
  };

  return (
    <div className="formWarpper loginWrapper">
      <form onSubmit={signupHandler__s1}>
        <p>SignUp</p>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          onChange={inputChangeHandler__s1}
          type="text"
          value={input.username}
          name="username"
          autoComplete="off"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          onChange={inputChangeHandler__s1}
          type="password"
          value={input.password}
          name="password"
          autoComplete="off"
          required
        />
        <label htmlFor="email">E-Mail</label>
        <input
          id="email"
          onChange={inputChangeHandler__s1}
          type="email"
          value={input.email}
          name="email"
          autoComplete="off"
          required
        />

        <button type="submit">SignUp</button>
        <Link to="/login">Already Registered? Login</Link>
      </form>
    </div>
  );

  // <form onSubmit={signupHandler__s2}>
  //   <input type="file" onChange={inputChangeHandler__s2} />
  //   <img src={file} alt="error.png" />
  //   {/* <button type="submit">Prev</button> */}
  //   <button type="submit">SignUp</button>
  // </form>
};

export default SignUp;
