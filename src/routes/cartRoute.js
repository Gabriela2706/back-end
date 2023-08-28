import { Router } from "express";
import CartManager from "../db/dao/classCartManager.js";
import ProductManager from "../db/dao/classProductManager.js";
const routerCart = Router();
const managerCart = new CartManager();
const managerProduct = new ProductManager();

//Obtiene todos los carritos (FUNCIONA)
routerCart.get("/", async (req, res) => {
  let allCarts = await managerCart.getCart();
  res.send(allCarts);
});

//crea un nuevo carrito (FUNCIONA)
routerCart.post("/", async (req, res) => {
  const body = req.body;
  const newCart = await managerCart.createCart(body);
  res.send(console.log(newCart));
});

//muestra el carrito con los productos y su detalle (Funciona)
routerCart.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartProducts = await managerCart.cartDetail(cid);

  res.send(cartProducts);
});

//agrega el producto al array “products” del carrito seleccionado (FUNCIONA)
routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const addproducts = await managerCart.addProductToCart(cid, pid);
  res.send(addproducts);
});

//Eliminar un producto de un carrito (Funciona)
routerCart.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const deleteFromCart = await managerCart.deletePidOfCid(cid, pid);
  res.send(deleteFromCart);
});

//Eliminar Los productos de un carrito (Funciona)
routerCart.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const deleteCart = await managerCart.deleteCart(cid);
  res.send(deleteCart);
});

//actualiza la cantidad del producto agregado dentro del carrito (NO FUNCIONA)
routerCart.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const changeQuantity = await managerCart.updateProdQuantity(
    cid,
    pid,
    quantity
  );
  res.send(changeQuantity);
});

export default routerCart;
