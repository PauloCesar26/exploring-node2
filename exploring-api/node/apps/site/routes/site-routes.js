import express from "express";
import { displayContentPost, displayInfoDb } from "../controllers/site-controllers.js";
import { uploadContent } from "../../api/multer/multer-config-content.js";

export const siteRouter = express.Router();

siteRouter.get("/", displayInfoDb);
siteRouter.get("/post/:id", uploadContent.single("image"), displayContentPost);


