import express from "express";
import { getProducts } from "../helpers/getProducts.js";
import shopify from "../shopify.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const session = await shopify.api.session.customAppSession(req.query.shop);
    const products = await getProducts(session);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
