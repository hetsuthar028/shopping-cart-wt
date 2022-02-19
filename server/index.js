require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user-router');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((result) => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log("Error::", err);
});

let db = mongoose.connection
db.on("error", (err) => {
    console.log("Connection error with MongoDB:", err);
});

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on PORT ${process.env.SERVER_PORT}`);
});