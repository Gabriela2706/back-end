// aca se levanta el servicio
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server as SocketServer } from "socket.io";
import mongoose from "mongoose";
import routerProducts from "./routes/productRoute.js";
import routerCart from "./routes/cartRoute.js";
import ProductModel from "./schemas/productSchema.js";
import routerViews from "./routes/productViewsRouter.js";
import ChatModel from "./schemas/chatSchema.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionFs from "session-file-store";
import routerUser from "./routes/userViewsRoute.js";
import MongoStore from "connect-mongo";

const app = express();
const FS = sessionFs(session);

//conexion con moongose atlas
const connMongoose = await mongoose.connect(
  `mongodb+srv://gabrielat0087:kD3MRROQUggHUPNE@clusterback0.p20zhu3.mongodb.net/ecommerce`
);

//------- SETEO DE HANDLEBARS---------
app.engine("handlebars", handlebars.engine()); // se setea el motor de vistas
app.set("views", `${__dirname}/views`); // le digo donde van a estar las vistas
app.set("view engine", "handlebars"); // aca le digo cual es el motor que se va a utilizar para leer esas vistas

//-------- USO DE MIDDLWARES ------
app.use(express.urlencoded({ extended: true })); //Esto me sirve para req.query para transformar el texto plano a objeto
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "159632PS",
    resave: true,
    saveUninitialized: true,

    store: new MongoStore({
      mongoUrl: `mongodb+srv://gabrielat0087:kD3MRROQUggHUPNE@clusterback0.p20zhu3.mongodb.net/ecommerce`,
      ttl: 120,
    }),
  })
);

//---------- ABREVIACION DE RUTAS PARA USO DE EXPRESS ---------------
app.use("/api/cart", routerCart);
app.use("/api/products", routerProducts);
app.use("/api/views", routerViews);
app.use("/api/users", routerUser);

//---------- CONTENIDO ESTATICO ---------------------------
app.use(express.static(`${__dirname}/public`));

// inicializacion de express
const appServer = app.listen(8082, () => {
  console.log("conectado correctamente");
});

//envoltorio de socke io
const io = new SocketServer(appServer);

// conexion con el cliente
io.on("connection", async (SocketServer) => {
  console.log(`Cliente con id: ${SocketServer.id} se ha conectado`);

  SocketServer.on("subirProductos", async (data) => {
    console.log(data);
    await ProductModel.create(data);
  });

  SocketServer.on("guardarChat", async (chat) => {
    console.log(chat);
    await ChatModel.create(chat);
  });
});
