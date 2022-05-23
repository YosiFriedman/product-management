const express = require("express");
const router = express.Router();

const { create, update, remove, list, read } = require("../controllers/product");

router.post("/product", create);
router.put("/product/:id", update);
router.get("/product/:id", read);
router.delete("/product/:id", remove);
router.get("/products", list);

module.exports = router;
