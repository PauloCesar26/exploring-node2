import fetch from "node-fetch";

export const displayInfoDb = async (req, res) => {
    try{
        const response = await fetch("http://localhost:3000/site/select-info", {
            method: "GET",
        });
        const result = await response.json();
        console.log("-------------");
        console.log(result);

        res.render("site/src/pages/site", {
            user: result.user
        });
    }
    catch{
        console.error("Error get data");
    }
}

