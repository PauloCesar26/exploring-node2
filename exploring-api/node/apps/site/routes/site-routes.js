import express from "express";
import { displayInfoDb } from "../controllers/site-controllers.js";

export const siteRouter = express.Router();

siteRouter.get("/", displayInfoDb);

