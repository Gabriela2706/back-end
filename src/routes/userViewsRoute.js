//http://localhost:8082/viewsUser/

import { Router } from "express";
import ProductManager from "../db/dao/classProductManager.js";
import { JWTMw } from "../config/jwt.js";
const routerUserViews = Router();
const managerProd = new ProductManager();

//MUESTRA EL LOGIN(Funciona)
routerUserViews.get("/login", (req, res) => {
  res.render(`login`);
});

//MUESTRA EL FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  res.render(`register`);
});

//VISTA DE PERFIL
routerUserViews.get("/profile", JWTMw, async (req, res) => {
  let products = await managerProd.getProducts();
  res.render(`home`, { prod: products });
});

//LOGOUT
routerUserViews.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    res.render(`logout`);
  });
});

export default routerUserViews;
