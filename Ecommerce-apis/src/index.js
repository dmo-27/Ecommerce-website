const express = require("express")

const cors = require("cors")

const app = express()

const jwtProvider = require("../src/config/jwtProvider");

app.use(express.json())
app.use(cors())
const jwt = require("jsonwebtoken");

const axios = require("axios");

app.get("/",(req,res)=>{
    return res.status(200).send(
        {message:"welcome to the e commerce website",status:true}
    )
})

const authRouters = require("../src/routes/auth_route");
app.use("/auth",authRouters);

// app.use((req, res, next) => {
//   console.log("Request Headers:", req.headers);
//   next();
// });
app.get("/server-time", (req, res) => {
  res.json({ serverTime: new Date().toISOString() });
});
app.get("/debug-time", async (req, res) => {
  try {
    const token = jwtProvider.generateToken("testUser");
    const decodedToken = jwt.decode(token);
    // const verifiedToken = jwtProvider.decodeToken(token);

    // Check external time.
    const worldTimeResponse = await axios.get("http://worldtimeapi.org/api/ip");
    const worldTime = new Date(worldTimeResponse.data.datetime);

    const localTime = new Date();
    const serverTime = new Date();

    const timeInfo = {
      localTime: localTime.toISOString(),
      serverTime: serverTime.toISOString(),
      worldTime: worldTime.toISOString(),
      tokenIssuedAt: new Date(decodedToken.iat * 1000).toISOString(),
      tokenExpiresAt: new Date(decodedToken.exp * 1000).toISOString(),
    //   currentTimestamp: getCurrentTimestamp(),
      timeDifferences: {
        localVsServer: Math.abs(localTime - serverTime),
        localVsWorld: Math.abs(localTime - worldTime),
        serverVsWorld: Math.abs(serverTime - worldTime),
      },
    };

    res.json(timeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const userRouters = require("../src/routes/user_route");
app.use("/api/users",userRouters);

const productRouters = require("./routes/product_route");
app.use("/api/products",productRouters);    

const adminProductRouters = require("./routes/adminProducts_route");
app.use("/api/admin/products", adminProductRouters);

const adminOrderRouters = require("../src/routes/adminOrder_route");
app.use("/api/admin/orders",adminOrderRouters);

const cartRouters = require("../src/routes/cart_route");
app.use("/api/cart", cartRouters);

const cartItemRouters = require("../src/routes/cartItem_route");
app.use("/api/cart_items", cartItemRouters);

const orderRouters = require("../src/routes/order_route");
app.use("/api/orders", orderRouters);

const reviewRouters = require("../src/routes/review_route");
app.use("/api/reviews", reviewRouters);

const ratingRouters = require("../src/routes/rating_route");
app.use("/api/ratings", ratingRouters);

  const paymentRouter = require("../src/routes/payment_route");
  app.use("/api/payments",paymentRouter);

module.exports = app;