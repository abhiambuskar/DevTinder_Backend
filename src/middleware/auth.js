
const adminAuth =  (req, res, next) =>{
    console.log("Admin getting checked")
    const token = "xyz";
    const authadmin = "xyz"

    if(authadmin === "xyz"){
        next();
    }else{
        res.status(401).send("Unauthorised access")
    }
}

const userAuth =  (req, res, next) =>{
    console.log("User getting checked")
    const token = "xyz";
    const authuser = "xyz"
    if(authuser === "xyz"){
        next();
    }else{
        res.status(401).send("Unauthorised access")
    }
}

module.exports = {adminAuth, userAuth}