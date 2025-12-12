import express from "express";
import { admin, viewLogin, makeLogin, makeLogout, manageUsers } from "../controllers/admin-controllers.js";
import { middlewareAuthAdmin } from "../middlewares/middleware-auth.js";

export const adminRouter = express.Router();

adminRouter.get("/", middlewareAuthAdmin, admin);
adminRouter.get("/admin-login", viewLogin);
adminRouter.post("/admin-login", makeLogin);
adminRouter.get("/logout", makeLogout);
adminRouter.get("/manage-user", manageUsers);
// adminRouter.post("/register-user", registerUser);
// adminRouter.post("/register-user", upload.single("userImg"), registerUser);
// adminRouter.post("/manage-user/delete/:id", deleteUser);