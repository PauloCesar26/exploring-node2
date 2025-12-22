import { db } from "../database/db-connection.js";
import jwt from "jsonwebtoken";

export const adminMakeLogin = (req, res) => {
    const JWT_SECRET = "3913ecc3c31c5f9542ecd7542b15d9df7cb3f0e7a5beb5cc46df9cf4e6979b64";

    const { user, password } = req.body;
    const sql = "SELECT * FROM adminApp WHERE userName = ?";

    db.query(sql, [user], (err, result) => {
        if(err){
            console.error("Erro ao buscar user name: ", err);
            return res.status(500).send(err);
        }

        if(result.length === 0){
            return res.status(400).json({ 
                errorUser: "Invalid username",
                errorPassword: null 
            });
        }

        const admin = result[0];
        
        if(password !== admin.userPassword){
            return res.render("admin/login/login", { 
                errorUser: null,
                errorPassword: "Invalid password, please try again" 
            });
        }

        const token = jwt.sign({
            id: admin.id_admin,
        }, JWT_SECRET, {
            expiresIn: "15m"
        });

        res.status(200).json({
            admin: {
                id: admin.id_admin,
                userName: admin.userName,
                token: token
            }
        });
        console.log("Admin:", admin.userName);
        console.log("Token:", token);
    });
}

export const adminRegisterUser = (req, res) => {
    const { name, email, slug } = req.body;
    const imageName = req.file.filename;
    const imgUrl = `http://localhost:3000/uploads/${imageName}`;
    
    const sql = "INSERT INTO infoUsers (userImg, nome, email, slug) VALUES (?, ?, ?, ?)";

    db.query(sql, [imgUrl, name, email, slug], (err, result) => {
        if(err){
            console.error("Erro ao inserir:", err);
            return res.status(500).send(err);
        }

        res.json({ message: "Usuário cadastrado com sucesso" });
    });
}

export const adminManageUsers = (req, res) => {
    const sql = "SELECT * FROM infoUsers";

    db.query(sql, (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
            return res.status(500).send(err);
        }
        else{
            res.json({
                user: result
            });
        }
    });
}

export const adminDeleteUser = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM infoUsers WHERE id = ?", [id], (err, result) => {
        if(err){
            console.error("Erro ao buscar dados: ", err);
        }
        else{
            res.status(200).json({message: "User deleted"});
        }
    });
}