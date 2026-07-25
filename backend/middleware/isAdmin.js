const isAdmin = (req, res, next) => {

if (req.user.is_admin !== 1) {

return res.status(403).json({
message: "Access Denied",
});

}

next();

};

module.exports = isAdmin;


