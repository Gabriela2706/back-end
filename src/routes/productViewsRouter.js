//./viewsProduct
import { Router } from "express";
import ProductManager from "../db/dao/classProductManager.js";
import CartManager from "../db/dao/classCartManager.js";
const routerViews = Router();
const managerProd = new ProductManager();
const managerCart = new CartManager();

//devuelve la lista de todos nuestros productos
routerViews.get("/", async (req, res) => {
  let products = await managerProd.getProducts();
  res.render(`home`, { prod: products });
});

// devuelve una vista para ingresar un producto nuevo
routerViews.get("/realtimeproducts", async (req, res) => {
  res.render(`realTimeProducts`);
});

//devuelve la vista del chat de socketio
routerViews.get("/chat", async (req, res) => {
  res.render(`chat`);
});

//Ruta para ver el detalle de todos los productos
routerViews.get("/products", async (req, res) => {
  let products = await managerProd.getProducts();
  res.render(`products`, { prod: products });
});

//Ruta para ver los productos de un carrito especifico ( Me trae todos los carritos y tengo que ver la manera de que sea lea bien en la vista)
routerViews.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  let cart = await managerCart.getCartById(cid);
  res.render(`cartDetail`, { oneCart: cart });
});

export default routerViews;
