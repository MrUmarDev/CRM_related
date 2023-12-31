const Admins = require("../../model/adminModel");
const CustomError = require("../../utils/errorCheck");

const adminCheck = async (req, res, next) => {
    try {
        const { decoded } = req;
        const admin = await Admins.findOne({ phoneNumber: decoded.phoneNumber })
        if (!admin) {
            throw new CustomError(403, "Permission denied");
        }
        req.admin = admin;
        next()
    } catch (err) {
        res.status(403).json({ message: err.message });
        next(err);
    }
}
module.exports = adminCheck;