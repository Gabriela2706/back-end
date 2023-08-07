import { Router } from "express";
import CartManager from "../db/dao/classCartManager.js";
import ProductManager from "../db/dao/classProductManager.js";
const routerCart = Router();
const managerCart = new CartManager();
const managerProduct = new ProductManager();

//Obtiene todos los carritos creados hasta el momento
routerCart.get("/", async (req, res) => {
  let allCarts = await managerCart.getCart();
  res.send(allCarts);
});

//crea un nuevo carrito (FUNCIONA CORRECTAMENTE Y CREA UN CARRITO NUEVO SIN PROBLEMAS.)
routerCart.post("/", async (req, res) => {
  const body = req.body;
  const newCart = await managerCart.createCart(body);
  res.send(console.log(newCart));
});

//obtiene carrito por id (NO FUNCIONA, REVISAR)
routerCart.get("/:id", async (req, res) => {
  const { id } = req.params;
  const cart = await managerCart.getCartById(id);
  res.send(cart);
});

//agrega el producto al array “products” del carrito seleccionado (NO FUNCIONA, REVISAR)
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const addproducts = await managerCart.addProductToCart(
    await managerCart.getCartById(+cid),
    await managerProduct.getProductById(+pid)
  );
  res.send(addproducts);
});

export default routerCart;
