//api/viewsUser/

import { Router } from "express";
import ProductManager from "../db/dao/classProductManager.js";
import passport from "passport";
const routerUserViews = Router();
const managerProd = new ProductManager();

//MUESTRA EL LOGIN
routerUserViews.get("/login", (req, res) => {
  res.render("login");
});
//OBTIENE EL LOGIN (uso del passport-local)
routerUserViews.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    res.redirect("profile");
  }
);

//MUESTRA EL FORMULARIO DE REGISTRO
routerUserViews.get("/register", async (req, res) => {
  res.render(`register`);
});

//OBTIENE EL REGISTRO (uso del passport-local)
routerUserViews.post(
  "/register",
  passport.authenticate("register", {
    successMessage: "Usuario creado exitosamente!",
    failureMessage: "No se pudo realizar el registro correctamente!",
  }),
  async (req, res) => {}
);

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

//REDIRECCIONADOR LOGIN CON ESTRATEGIA DE GITHUB
routerUserViews.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

//CALLBACK LOGIN CON ESTRATEGIA DE GITHUB
routerUserViews.get(
  "/authgithub",
  passport.authenticate("github", {
    successMessage: "Inicio de sesion Exitoso con GitHub",
    failureMessage: "Error de inicio",
    successRedirect: "/profile",
  }),
  async (req, res) => {}
);

export default routerUserViews;
