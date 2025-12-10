import express from "express";
import { selectUsers } from "../controllers-api/website-controllers.js";

export const apiSiteRouter = express.Router();

apiSiteRouter.get("/select-info", selectUsers);