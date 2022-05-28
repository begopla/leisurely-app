const exposeUsers = (req,res,next) =>{
    if(req.session.currentUser){
        console.log("is there a current user?")
        res.locals.currentUser = req.session.currentUser;
        res.locals.isLoggedIn =true;
    }
    next();
}
module.exports = exposeUsers;