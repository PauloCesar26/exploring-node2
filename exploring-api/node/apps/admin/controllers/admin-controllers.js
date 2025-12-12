import fetch from "node-fetch";

export const viewLogin = (req, res) => {
    res.render("admin/src/pages/login/login", { errorUser: null, errorPassword: null });
}

export const admin = (req, res) => {
    res.render("admin/src/pages/index");
}

export const makeLogin = async (req, res) => {
    const { user, password } = req.body;
    
    try{
        const response = await fetch("http://localhost:3000/api/admin/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, password }),
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
            name: admin.admin.username,
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

export const manageUsers = async (req, res) => {
    try{
        const response = await fetch("http://localhost:3000/api/admin/manage-user", {
            method: "GET",
        });
        const result = await response.json();
        console.log("------ADMIN------");
        console.log(result);

        res.render("admin/src/pages/admin-manage/admin-user", {
            user: result.user
        });
    }
    catch(error){
        console.error("Error get users: ", error);
    }
}