const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const productsRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cardRoute = require("./routes/getCardItems");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config();

require("./db/db");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// app.use(express.static('public'))
app.use("/images", express.static("images"));

app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/card", cardRoute);
app.use("/payments", stripeRoute);

// app.use(
//   express.static(path.join(__dirname, "/build"))
// );

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/build", "index.html")
//   );
// });

app.get('/', (req, res) => {
  res.json({message: "working"})
})

app.listen(PORT, () => {
  console.log(`Server is started http://localhost:${PORT}`);
});

