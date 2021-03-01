module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/index');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    },
    hasPermission(req, res, next) {
        if(req.user.rol_id < 2){
            return next();
        }
        req.flash('message', 'No tienes los suficientes permisos.');
        return res.redirect('/profile');
    }
};