import express from "express";
import { adminMakeLogin, adminRegisterUser, adminManageUsers } from "../controllers-api/admin-controllers.js";
import { upload } from "../multer/multer-config.js";
import { middlewareAuthJwt } from "../middlewares/auth-jwt.js";

export const apiAdminRouter = express.Router();

apiAdminRouter.post("/admin-login", adminMakeLogin);
apiAdminRouter.get("/manage-user", middlewareAuthJwt, adminManageUsers);
apiAdminRouter.post("/register-user", middlewareAuthJwt, upload.single("userImg"), adminRegisterUser);