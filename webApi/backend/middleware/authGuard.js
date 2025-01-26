const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) =>{
    
    //check incomming data
    console.log(req.headers) //pass'

    //get authorozation data from headers
    const authHeader = req.headers.authorization;
    
    //check or validate and stop the process so use return
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Auth Header not found"
        })
    }

    //split the data(Format:'Bearer token-dfghj')-only token
    const token = authHeader.split(' ')[1];
    
    //if token not found: stop the porcess(res)
    if(!token || token ===''){
        return res.status(401).json({
            success: false,
            message: "Token not found"
        })
    }

    //if token found: verify
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();

    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Not Authenticated"
        })
    }


    //if verified:next(fun in controller) 
    //if not verified: not auth

}


//AdminGuard
const adminGuard = (req, res, next) =>{
    
    //check incomming data
    console.log(req.headers) //pass'

    //get authorozation data from headers
    const authHeader = req.headers.authorization;
    
    //check or validate and stop the process so use return
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Auth Header not found"
        })
    }

    //split the data(Format:'Bearer token-dfghj')-only token
    const token = authHeader.split(' ')[1];
    
    //if token not found: stop the porcess(res)
    if(!token || token ===''){
        return res.status(401).json({
            success: false,
            message: "Token not found"
        })
    }

    //if token found: verify
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser; //uiser infop: id only
        if(!req.user.isAdmin){
            return res.status(400).json({
                success: false,
                message: "Permission Denied"
            })
        }
        next();

    }catch(error){
        res.status(404).json({
            success: false,
            message: "Not Authenticated"
        })
    }


    //if verified:next(fun in controller) 
    //if not verified: not auth

}

module.exports = {
    authGuard,
    adminGuard
}