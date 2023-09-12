import jwt from "jsonwebtoken";

const SECRET = "hgirehglkrnglkerhglkrenglk";

// const token = jwt.sign(
//   { id: "id", email: "gabriela.t0087@gmail.com", name: "Gabriela" },
//   SECRET,
//   { expiresIn: "1h" }
// );
// console.log(token);

// const validate = jwt.verify(token, SECRET);
// console.log(validate);

//Este metodo vamos a llamar para la generacion de login
export const tokenGenerate = (user) =>
  jwt.sign({ user }, SECRET, { expiresIn: "1h" }); //Generar token

//hago un middleware para enviar en cada llamada el JWT
export const JWTMw = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send({ msg: "No autorizado" });
  //bearer token
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET);
    req.user = user.user;
    next();
  } catch (error) {
    return res.status(403).send({ msg: "Sin autorizacion" });
  }
};
