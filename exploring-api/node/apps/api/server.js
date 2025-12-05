import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";
import { db } from "./database/db-connection.js";
import { apiAdminRouter } from "./routes-api/admin-routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({secret: 'anfdjkfjdkhfdsdgoyitgj'}));

db.connect((err) => {
  if(err){
  console.error("Erro ao conectar no banco:", err);
  }
  else{
  console.log("Conectado ao MySQL.");
  }
});

app.use("/api", apiAdminRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/api");
});