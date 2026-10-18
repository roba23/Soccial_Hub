
export function checkauthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/login");
    }
}
export function checkLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        res.redirect("/welcome");
    }
    else{
        next();
    }
}