const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LKu4dF9kfrhUvHi6loO1UnCkthaOrsDjHveGWPisJWEqRHWR0fK7zrikhN27l5uKGfIkbEb8322cOaoPLfmhOLv00umPlNNbx"
);

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", function (request, response) {
  response.status(200).send("hello world");
});

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5005/amazn-shop/us-central1/api

//

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// http://localhost:5005/amazn-shop/us-central1/api
