import { Router } from "express";
import ProductManager from "../db/dao/classProductManager.js";
const routerProducts = Router();
const manager = new ProductManager();

//obtener productos con paginacion (Funciona)
routerProducts.get("/", async (req, res) => {
  const { limit = 3, page = 1, sort = 1, ...query } = req.query;
  let products = await manager.getProducts(query, {
    limit: limit,
    lean: true,
    page: page,
    sort: { price: +sort },
  });

  res.send(products);
});
//obtiene productos por id (FUNCIONA)
routerProducts.get("/:id", async (req, res) => {
  const { id } = req.params;
  let products = await manager.getProductById(id);
  res.send(products);
});

//agrega un nuevo producto (FUNCIONA)
routerProducts.post("/", async (req, res) => {
  const body = req.body;
  try {
    const newProduct = await manager.addProducts(body);
    res.send(newProduct);
  } catch (err) {
    res.status(502).send({ error: true });
  }
});

// cambia algun dato de un producto, sin modificar el ID (FUNCIONA)
routerProducts.put("/:id", async (req, res) => {
  const { id } = req.params;
  let product = req.body;
  const changes = await manager.updateProducts(id, product);
  res.send({ update: true });
});

// Elimina un producto de la base de datos (FUNCIONA)
routerProducts.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let product = await manager.deleteProduct(id);

  res.send(product);
});

export default routerProducts;
