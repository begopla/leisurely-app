const exposeUsers = (req,res,next) =>{
    if(req.session.currentUser){
        console.log("is there a current user?")
        res.locals.currentUser = req.session.currentUser;
        res.locals.isLoggedIn =true;
    }
    next();
}
//TODO: add middleware to expose activity user
// const  activityUser = (req,res,next) =>{
//     if(req.session.currentUser === req.app.locals.activityUser){

//         next()
//     }
//     else{

//     }
// }
module.exports = exposeUsers;


