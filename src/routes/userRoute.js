//http://localhost:8082/api/user/

import { Router } from "express";
import passport from "passport";
import UserManager from "../db/dao/classUserManager.js";
import { tokenGenerate } from "./../config/jwt.js";

const routerUsers = Router();
const userM = new UserManager();

//VISTA DE LA RUTA CURRENT (Funciona)
routerUsers.get(
  "/session/current",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    res.send({ user: req.user });
  }
);

//OBTIENE EL LOGIN (uso del passport-local/Funciona)
routerUsers.post("/login", passport.authenticate("login"), async (req, res) => {
  console.log(req.body);
  const ingreso = await userM.validateUser(req.body.email, req.body.password);

  if (!ingreso) return res.send({ error: true }); //Aca se genera el token
  const token = tokenGenerate({
    sub: ingreso._id,
    ingreso: { email: ingreso.email },
  });

  res.cookie("accessToken", token, {
    //Aca se guarda en una cookie
    maxAge: 12 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.send({ error: false, accessToken: token });
});

//OBTIENE EL REGISTRO (uso del passport-local)
routerUsers.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/viewsUser/login",
    failureMessage: "No se pudo realizar el registro correctamente!",
  }),
  async (req, res) => {}
);

//REDIRECCIONADOR LOGIN CON ESTRATEGIA DE GITHUB
routerUsers.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

//CALLBACK LOGIN CON ESTRATEGIA DE GITHUB
routerUsers.get(
  "/authgithub",
  passport.authenticate("github", {
    successMessage: "Inicio de sesion Exitoso con GitHub",
    failureMessage: "Error de inicio",
    successRedirect: "/api/viewsUser/profile",
  }),
  async (req, res) => {}
);

export default routerUsers;
