import express from "express";
import { adminMakeLogin, adminRegisterUser, adminManageUsers } from "../controllers-api/admin-controllers.js";
import { upload } from "../multer/multer-config.js";

export const apiAdminRouter = express.Router();

apiAdminRouter.post("/admin-login", adminMakeLogin);
apiAdminRouter.get("/manage-user", adminManageUsers);
apiAdminRouter.post("/register-user", upload.single("userImg"), adminRegisterUser);