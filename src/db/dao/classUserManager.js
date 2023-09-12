import userModel from "../../schemas/userSchema.js";
import bcrypt from "bcrypt";

export default class UserManager {
  constructor() {}

  //OBTENER TODOS LO USUARIOS
  getUser = async () => {};

  //AGREGAR USUARIOS NUEVOS
  addUser = async (user) => {
    //name, lastName, email, password, role
    //const salt = user.email == "admincoder@coder.com" ? "admin" : "visit";
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    userModel.create(user);

    return user;
  };
  //VALIDAR EMAIL Y PASSWORD PARA INGRESAR
  validateUser = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (!user) return false;
    const newLogin = await bcrypt.compare(password, user.password);

    return newLogin ? user.toObject() : false;
  };

  //VALIDAR SI EXISTE USUARIO CON EL EMAIL
  userExist = async (email) => {
    const user = await userModel.findOne({ email });
    if (user) return console.log("Email ya registrado");
  };

  //VALIDAR SI EXISTE ID DEL USUARIO
  idExist = async (id) => {
    const idExist = await userModel.findById(id);
    if (idExist) return false;
  };
}
