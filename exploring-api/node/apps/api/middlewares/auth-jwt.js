import jwt from "jsonwebtoken";

export function middlewareAuthJwt(req, res, next){
    const JWT_SECRET = "3913ecc3c31c5f9542ecd7542b15d9df7cb3f0e7a5beb5cc46df9cf4e6979b64";
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader){
        return res.status(401).json({ message: "Token ausente" });
        // return res.redirect("/admin/admin-login");
    }

    const token = tokenHeader.split(" ")[1];

    try{
        req.admin = jwt.verify(token, JWT_SECRET);
        next();
    }
    catch{
        return res.status(401).json({
            message: "Token inválido"
        });
    }
}