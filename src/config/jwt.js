import jwt from "jsonwebtoken";

export const SECRET = "hgirehglkrnglkerhglkrenglk";

//Este metodo vamos a llamar para la generacion de login
export const tokenGenerate = (objet) =>
  jwt.sign(objet, SECRET, { expiresIn: "1h" }); //Generar token

//hago un middleware para enviar en cada llamada el JWT
// export const JWTMw = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(403).send({ msg: "No autorizado" });
//   //bearer token
//   const token = authHeader.split(" ")[1];

//   try {
//     const user = jwt.verify(token, SECRET);
//     req.user = user.user;
//     next();
//   } catch (error) {
//     return res.status(403).send({ msg: "Sin autorizacion" });
//   }
// };

// //Middleware para estrategia de token en cookie
// export const current = (req, res, next) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.send({ msj: "no existe token" }); //Funciona
//   try {
//     const validate = jwt.verify(token, SECRET);
//     next();
//   } catch (error) {
//     return res.send({ msj: "error de token" });
//   }
// };
