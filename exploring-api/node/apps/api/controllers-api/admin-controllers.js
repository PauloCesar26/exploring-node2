import { db } from "../database/db-connection.js";

export const adminMakeLogin = (req, res) => {
    const { user, password } = req.body;
    const sql = "SELECT * FROM adminApp WHERE userName = ?";

    db.query(sql, [user, password], (err, result) => {
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

        res.json({
            admin: {
                id: admin.id_admin,
                username: admin.userName,
                isLogged: false
            }
        });
        console.log("Admin:", admin.userName);
    });
}

export const adminRegisterUser = (req, res) => {
    const {name, email} = req.body;
    const imageName = req.file.filename;
    const imgUrl = `http://localhost:3000/uploads/${imageName}`;
    
    const sql = "INSERT INTO infoUsers (userImg, nome, email) VALUES (?, ?, ?)";

    db.query(sql, [imgUrl, name, email], (err, result) => {
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