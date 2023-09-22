//http://localhost:8082/viewsUser/

import { Router } from "express";
import ProductManager from "../db/dao/classProductManager.js";
//import { current } from "../config/jwt.js";
import passport from "passport";
const routerUserViews = Router();
const managerProd = new ProductManager();

//MUESTRA EL LOGIN(Funciona)
routerUserViews.get("/login", async (req, res) => {
  res.render(`login`);
});

//MUESTRA EL FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  res.render(`register`);
});

//VISTA DE PERFIL- protegida por la estrategia current que es Jwt con passport
routerUserViews.get(
  "/profile",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    let products = await managerProd.getProducts();
    res.render(`home`, { prod: products });
  }
);

//LOGOUT
routerUserViews.get("/logout", async (req, res) => {
  req.session.destroy((e) => {
    res.render(`logout`);
  });
});

export default routerUserViews;
