import { async } from "@firebase/util";
import {
  collection,
  doc,
  where,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
function Orders() {
  // const [{ basket, user }, dispatch] = useStateValue();
  const [{ basket }, dispatch] = useStateValue();
  const [user, setUser] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUser(() => {
      return auth?.currentUser;
    });
    // if (user) {
    //   db.collection("users")
    //     .doc(user?.uid)
    //     .collection("orders")
    //     .orderBy("created", "desc")
    //     .onSnapshot((snapshot) =>
    //       setOrders(
    //         snapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           data: doc.data(),
    //         }))
    //       )
    //     )

    if (user) {
      const fetchCurrentOrders = async () => {
        const q = query(collection(db, "user"));
        const querySnapshot = await getDocs(q);
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        const queryData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(queryData);

        // const mainRef = collection(db, "users");
        //users is my main collection, containing all the users
        // const users = await getDocs(mainRef);
        //Getting all the users
        // users.forEach(async (user) => {
        // loop through each user so that we got id for each document(user) to get sub collection data
        //   let userCollectionRef = collection(db, `users/${user.id}/orders`);
        //orders is my sub-collection name
        //   const OrdersDoc = await getDocs(userCollectionRef);
        //getting all docs for particular user in sub-collection(orders)
        //   OrdersDoc.forEach((item) => console.log(item.data()));
        // loop through each document in 'order' for each user so that we got nested data
        // });
      };
      fetchCurrentOrders();
    } else {
      setOrders([]);
    }

    // console.log(user);
  }, [user]);
  // console.log("orders", orders);
  return (
    <div className="orders">
      <h1 style={{ color: "green" }}>Your Order is processed</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
