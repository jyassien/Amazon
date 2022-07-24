import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import { auth, db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import NumberFormat from "react-number-format";

function Payment() {
  const [{ basket }, dispatch] = useStateValue();
  const [user, setUser] = useState(false);

  // let user = auth.currentUser;
  const navigate = useNavigate();

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const [clientSecret, setClientSecret] = useState(true);
  const [items, setItems] = useState("");

  // useEffect(() => {
  //   // generate the special stripe secret which allows us to charge a customer
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       // Stripe expects the total in a currencies subunits
  //       url: `http://localhost:5005/amazn-shop/us-central1/api/payments/create?total=${
  //         getBasketTotal(basket) * 100
  //       }`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };

  //   getClientSecret();
  // }, [basket]);

  // console.log("THE SECRET IS >>>", clientSecret);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     })
  //     .then(({ paymentIntent }) => {
  //       // paymentIntent = payment confirmation
  //       // ////////////////////////////////
  //       // const usersCollectionRef = collection(db, "users");
  //       // // Grab and attach 'users' collection from the databas(db)
  //       // const userDoc = doc(db, "users", id);
  //       // // doc: creates an instance of a document.
  //       // await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });

  //       // ////////////////////////////////
  //       // const messageRef = doc(db, "collection", "document", "subCollection", "subDocument");
  //       const userRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);

  //       const setUserCollection = async () => {
  //         await setDoc(userRef, {
  //           basket: basket,
  //           amount: paymentIntent.amount,
  //           created: paymentIntent.created,
  //         });
  //       };
  //       setUserCollection();

  //       // db.collection("users")
  //       //   .doc(user?.uid)
  //       //   .collection("orders")
  //       //   .doc(paymentIntent.id)
  //       //   .set({
  //       //     basket: basket,
  //       //     amount: paymentIntent.amount,
  //       //     created: paymentIntent.created,
  //       //   });

  //       setSucceeded(true);
  //       setError(null);
  //       setProcessing(false);

  //       dispatch({
  //         type: "EMPTY_BASKET",
  //       });

  //       navigate("/orders");
  //     });
  // };

  useEffect(() => {
    setUser(() => {
      return auth?.currentUser;
    });
    //Generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currencies subunites
        url: `http://localhost:5005/amazn-shop/us-central1/api/payments/create?total=${
          getBasketTotal(basket) * 100
        }`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  // console.log("Secrete code : ", clientSecret);
  // console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        // db.collection("users")
        //   .doc(user?.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id) //create document with paymnetIntent id
        //   .set({
        //     //add this information in
        //     basket: basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });

        const userRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);

        setDoc(userRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        const currentOrders = doc(db, "user", "order");
        setDoc(currentOrders, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <NumberFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
