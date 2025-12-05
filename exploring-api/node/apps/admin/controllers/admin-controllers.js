import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

export const viewLogin = (req, res) => {
    res.render("admin/login/login", { errorUser: null, errorPassword: null });
}

export const admin = (req, res) => {
    res.render("admin/index");
}

export const makeLogin = async (req, res) => {
    const { user, password } = req.body;
    
    try{
        const response = await fetch("http://localhost:3000/api/admin/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password })
        });
        console.log(response);
        console.log("-------------");

        const admin = await response.json();
        console.log(admin);
        console.log("-------------");

        if(!response.ok){
            return res.render("admin/login/login", {
                errorUser: admin.errorUser || null,
                errorPassword: admin.errorPassword || null
            });
        }

        req.session.admin = {
            id: admin.admin.id,
            name: admin.admin.username
        };
        console.log("Admin:", req.session.admin);

        return res.redirect("/admin");
    } 
    catch(error){
        console.error("Erro ao fazer login via API:", error);
        return res.status(500).send("Erro interno.");
    }
}

export const makeLogout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin");
}

export const registerUser = async (req, res) => {
    const form = new FormData();
    console.log(req.body.name);

    try{
        form.append("name", req.body.name);
        form.append("email", req.body.email);
        form.append("userImg", fs.createReadStream(req.file.path));
    
        const response = await fetch("http://localhost:3000/api/admin/register-user", {
            method: "POST",
            headers: form.getHeaders(),
            body: form
        });
    
        const result = await response.json();
        console.log(result);

        res.redirect("/admin");
    }
    catch(error){
        console.error("Error: ", error);
        return res.status(500).send("Erro");
    }
}


// export const manageUsers = async (req, res) => {
//     try{
//         const response = await fetch("http://localhost:3000/api/admin/manage-users");
//         const users = await response.json();
//         console.log(users);

//         res.render("admin/admin-manage/admin-user", {
//             user: users
//         });
//     }
//     catch(error){
//         console.error("Error get users: ", error);
//     }
// }