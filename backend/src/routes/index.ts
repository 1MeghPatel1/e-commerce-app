//library imports
import express from "express";

//local imports
import authRouter from "./auth.route";
import productsRouter from "./products.route";
import adminRouter from "./admin.route";
import orderRouter from "./order.route";
import cartRouter from "./cart.route";
import reviewRatingRouter from "./reviewRating.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/products", productsRouter);
router.use("/orders", orderRouter);
router.use("/cart", cartRouter);
router.use("/reviews", reviewRatingRouter);

export default router;
