import crypto from "crypto";
export default class UserManager {
  constructor() {}

  //OBTENER TODOS LO USUARIOS
  getUser = async () => {};
  //AGREGAR USUARIOS NUEVOS
  addUser = async (user) => {
    //name, lastName, userName, password, role
    user.salt = crypto.randomBytes(128).toString("base64");
    user.password = crypto
      .createHmac("sha256", user.salt)
      .update(user.password)
      .digest("hex");

    userModel.create(user);
    const userCreate = await userModel.insertMany([user]);
    return userCreate;
  };
  //VALIDAR USUARIO NUEVO
  validateUser = async (username, password) => {
    const user = await userModel.findOne({ username });
    if (!user) return console.log("Usuario Invalido");
    const newLogin = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    return newLogin == user.password ? user.toObject() : false;
  };
}
