//configuracion de passport estrategis
import passport from "passport";
import local from "passport-local";
import UserManager from "../db/dao/classUserManager.js";
//import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { tokenCookie } from "../utils/jwtCookie.js";
import { SECRET } from "./jwt.js";

const userM = new UserManager();

const initLocalStrategy = () => {
  // REGISTRO
  passport.use(
    "register",
    new local.Strategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, next) => {
        const emailExist = await userM.userExist(email); //valido si existe el email a registrar
        if (emailExist) return false;

        const body = req.body;
        const newUser = await userM.addUser(body);
        return next(null, newUser.toObject());
      }
    )
  );
  //LOGIN
  passport.use(
    "login",
    new local.Strategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, next) => {
        const login = await userM.validateUser(email, password);
        console.log(login);
        if (!login) return next("email y/o contraseña invalidos");
        return next(null, login);
      }
    )
  );
  // //ESTRATEGIA DE GITHUB
  // passport.use(
  //   "github",
  //   new GithubStrategy(
  //     {
  //       //primer llamada con los datos de la estrategia
  //       clientID: "Iv1.dde9419804abf4e4",
  //       clientSecret: "04a5adc86c0ded9893b9168123dde497bf58d5fb",
  //       callbackURL: "http://localhost:8082/api/viewsUser/authgithub",
  //     },
  //     async (accessToken, refreshToken, profile, next) => {
  //       console.log(profile);
  //       const email = profile._json.email;
  //       const user = await userM.userExist(email);

  //       if (user) return next(null, user);

  //       const createUser = await userM.addUser({
  //         name: profile._json.name,
  //         lastName: profile._json.name,
  //         email,
  //         password: "",
  //         role: (profile._json.email = "admincoder@coder.com"
  //           ? "admin"
  //           : "visit"),
  //       });

  //       next(null, createUser);
  //     }
  //   )
  // );

  passport.use(
    //ESTRATEGIA DE JWT
    "current",
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([tokenCookie]), //extraigo el token de las cookies
        secretOrKey: SECRET,
      },
      async (payload, next) => {
        console.log(payload);
        const userSub = await userM.getUserByID(payload.sub);
        if (!userSub) return next("Payload.sub no encontrado");
        return next(null, userSub);
      }
    )
  );
  passport.serializeUser((newUser, next) => {
    next(null, newUser._id);
  });

  passport.deserializeUser(async (id, next) => {
    try {
      const user = await userM.getUserByID(id);
      next(null, user);
    } catch (error) {
      console.log(error.message);
    }
  });
};

export default initLocalStrategy;
