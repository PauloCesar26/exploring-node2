import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./database/db-connection.js";
import { apiAdminRouter } from "./routes-api/admin-routes.js";
import { apiSiteRouter } from "./routes-api/website-routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(session({secret: 'anfdjkfjdkhfdsdgoyitgj'}));
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

db.connect((err) => {
  if(err){
  console.error("Erro ao conectar no banco:", err);
  }
  else{
  console.log("Conectado ao MySQL.");
  }
});

app.use("/admin", apiAdminRouter);
app.use("/site", apiSiteRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});