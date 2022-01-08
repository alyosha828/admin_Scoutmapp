exports.verifyToken = function(req, res, next){
    if (req.session.token != undefined && req.session.token != "") {        
        next();
    } else {        
        //next();
        res.redirect('/login');
    }
    return;
}