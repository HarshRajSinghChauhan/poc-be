const authorize = (roles) => {
    
    return (req, res, next) => {
        console.log(req.user.role);
        if (roles !== req.user.role) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        next();
    }
}

module.exports = { authorize }