
exports.requireRole = role => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        next();
    };
};
