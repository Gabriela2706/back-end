//api/viewsUser/

import { Router } from "express";
import UserManager from "../db/dao/classUserManager.js";
const userM = new UserManager();
const routerUserViews = Router();

//MUESTRA TODOS LOS USUARIOS
routerUserViews.get("/", async (req, res) => {
  req.session.user = "ed";
  res.send("hola Mundo");
});
//MUESTRA EL LOGIN
routerUserViews.get("/login", (req, res) => {
  res.render("login");
});
//OBTIENE EL LOGIN
routerUserViews.post("/login", (req, res) => {
  res.render("login");
});

//FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  const body = req.body;
  const newUser = await userM.addUser(body);
  res.send(newUser);
});

//VISTA DE PERFIL
routerUserViews.get("/profile", (req, res) => {});
export default routerUserViews;
