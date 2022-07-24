import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { async } from "@firebase/util";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {}, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        navigate("/");
        // window.location.pathname = "/";
      }
    } catch (err) {
      alert(err.message);
    }

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     if (auth) {
    //       navigate("/");
    //       // console.log(auth);
    //       // console.log(auth.user);
    //     }
    //   })
    //   .catch((err) => alert(err.message));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user);
      if (user) navigate("/");
    } catch (err) {
      alert(err.message);
    }

    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((auth) => {
    //     if (auth) {
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
