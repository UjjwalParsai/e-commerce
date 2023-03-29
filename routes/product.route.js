import express from "express";
import { viewDescription, allProduct, productByCategory, search } from "../controller/product.controller.js";
import { verify } from "../middleware/authenticate.js";

const router = express.Router();
router.get("/view/:productId", viewDescription);
router.get("/all", allProduct);
router.get("/:categoryName", productByCategory);
router.get("/product-search/:keyword", search);
export default router;





