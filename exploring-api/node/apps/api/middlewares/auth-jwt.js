import jwt from "jsonwebtoken";

export function middlewareAuthJwt(req, res, next){
    const JWT_SECRET = "3913ecc3c31c5f9542ecd7542b15d9df7cb3f0e7a5beb5cc46df9cf4e6979b64";
    const tokenHeader = req.headers.authorization;

    if(!tokenHeader){
        return res.status(401).json({ message: "Token não autorizado" });
    }

    const token = tokenHeader.split(" ")[1];
    console.log("-----AUTHAPI------");
    console.log(token);

    try{
        req.adminToken = jwt.verify(token, JWT_SECRET);
        console.log("Tudo certo");
    }
    catch{
        return res.status(401).json({
            message: "Token inválido"
        });
    }
    next();
}