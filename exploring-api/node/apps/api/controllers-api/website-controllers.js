import { db } from "../database/db-connection.js";

export const selectUsers = (req, res) => {
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