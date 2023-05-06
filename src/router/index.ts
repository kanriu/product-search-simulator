import { Router } from "express";
import { getSearchProducts } from "../routeHandlers/product";

const router = Router();

router.get("/products", getSearchProducts);

export default router;
