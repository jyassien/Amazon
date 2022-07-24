import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./homePage/Header";
import Home from "./homePage/Home";
import Checkout from "./homePage/Checkout";
import Login from "./homePage/Login";
import Payment from "./homePage/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./homePage/Orders";
import { useEffect } from "react";

const promise = loadStripe(
  "pk_test_51LKu4dF9kfrhUvHi8qAImVCXwVRQymCK7t1WH55QpiFxCEaF2ExRHxCsRQSRVILPJ535JGLUHefUHlC7KSV3yJov000Qy9GlZ0"
);

function App() {
  // const [{}, dispatch] = useStateValue();
  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     // console.log("THE USER IS >>> ", authUser);
  //     if (authUser) {
  //       // the user just logged in / the user was logged in

  //       dispatch({
  //         type: "SET_USER",
  //         user: authUser,
  //       });
  //     } else {
  //       // the user is logged out
  //       dispatch({
  //         type: "SET_USER",
  //         user: null,
  //       });
  //     }
  //   });
  // }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
