import crypto from "crypto";
import userModel from "../../schemas/userSchema.js";

export default class UserManager {
  constructor() {}

  //OBTENER TODOS LO USUARIOS
  getUser = async () => {};

  //AGREGAR USUARIOS NUEVOS
  addUser = async (user) => {
    //name, lastName, email, password, role
    user.role = user.email == "admincoder@coder.com" ? "admin" : "visit"; // Si el email es el "admin..." el role sera admin, si no, sera visit o cualquiera
    user.salt = crypto.randomBytes(128).toString("base64");
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");

    userModel.create(user);

    //const userCreate = await userModel.insertMany([user]);
    return user;
  };
  //VALIDAR USUARIO NUEVO
  validateUser = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) return false;
    const newLogin = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    return newLogin == user.password ? user.toObject() : false;
  };
}
