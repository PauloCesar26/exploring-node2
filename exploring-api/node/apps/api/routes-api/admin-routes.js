import express from "express";
import { adminMakeLogin, adminRegisterUser } from "../controllers-api/admin-controllers.js";
import { upload } from "../multer/multer-config.js";

export const apiAdminRouter = express.Router();

apiAdminRouter.post("/admin/admin-login", adminMakeLogin);
// apiAdminRouter.post("/admin/manage-user", adminManageUsers);
apiAdminRouter.post("/admin/register-user", upload.single("userImg"), adminRegisterUser);