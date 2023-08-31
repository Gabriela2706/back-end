//api/viewsUser/

import { Router } from "express";
import UserManager from "../db/dao/classUserManager.js";
import ProductManager from "../db/dao/classProductManager.js";
const userM = new UserManager();
const routerUserViews = Router();
const managerProd = new ProductManager();

//MUESTRA EL LOGIN
routerUserViews.get("/login", (req, res) => {
  res.render("login");
});
//OBTIENE EL LOGIN
routerUserViews.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userM.validateUser(username, password);
  if (!user) return res.redirect("login");
  delete user.password;
  delete user.salt;

  req.session.user = user;

  res.redirect("profile");
});

//MUESTRA EL FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  res.render(`register`);
});

//OBTIENE EL REGISTRO
routerUserViews.post("/register", async (req, res) => {
  const body = req.body;
  const newUser = await userM.addUser(body);
  if (!newUser) return "Faltan datos en el registro";
  req.session.user = newUser;
});

//VISTA DE PERFIL
routerUserViews.get("/profile", async (req, res) => {
  const { name, lastname } = req.session.user;
  let products = await managerProd.getProducts();
  res.render(`home`, { name, lastname, prod: products });
});

//LOGOUT
routerUserViews.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    res.render(`logout`);
  });
});

export default routerUserViews;
