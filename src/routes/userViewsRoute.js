import { Router } from "express";
const routerUser = Router();

//MUESTRA TODOS LOS USUARIOS
routerUser.get("/", async (req, res) => {
  req.session.user = "ed";
  res.send("hola Mundo");
});
//MUESTRA EL LOGIN
routerUser.post("/login", (req, res) => {
  res.render("login");
});

//FORMULARIO DE REGISTRO
routerUser.get("/register", (req, res) => {});

//VISTA DE PERFIL
routerUser.get("/profile", (req, res) => {});
export default routerUser;
