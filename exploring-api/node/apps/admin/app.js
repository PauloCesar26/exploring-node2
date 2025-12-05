import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { adminRouter } from "./routes/admin-routes.js";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

console.log("Diretório atual (__dirname):", __dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'anfdjkfjdkhfdsdgoyitgj'}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../../ui"));

app.use("/admin", adminRouter);

app.listen(3001, () => {
  console.log("Admin rodando em http://localhost:3001");
});