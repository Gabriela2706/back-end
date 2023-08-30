//api/viewsUser/

import { Router } from "express";
import UserManager from "../db/dao/classUserManager.js";
const userM = new UserManager();
const routerUserViews = Router();

//MUESTRA TODOS LOS USUARIOS
routerUserViews.get("/", async (req, res) => {
  res.render("users");
});
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

//FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  const body = req.body;
  const newUser = await userM.addUser(body);
  res.send(newUser);
});

//VISTA DE PERFIL
routerUserViews.get("/profile", (req, res) => {
  const { nombre, apellido, username } = req.session.user;
  res.render("profile", { nombre, apellido, username });
});
export default routerUserViews;
