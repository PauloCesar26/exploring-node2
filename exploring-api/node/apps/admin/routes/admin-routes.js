import express from "express";
import { admin, viewLogin, makeLogin, makeLogout, manageUsers, registerUser, deleteUser } from "../controllers/admin-controllers.js";
import { middlewareAuthAdmin } from "../middlewares/middleware-auth.js";

export const adminRouter = express.Router();

adminRouter.get("/", middlewareAuthAdmin, admin);
adminRouter.get("/admin-login", viewLogin);
adminRouter.post("/admin-login", makeLogin);
adminRouter.get("/logout", makeLogout);
adminRouter.get("/manage-user", middlewareAuthAdmin, manageUsers);
adminRouter.post("/register-user", middlewareAuthAdmin, registerUser);
adminRouter.post("/manage-user/:id", deleteUser);