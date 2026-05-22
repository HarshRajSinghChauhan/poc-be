const userService = require('./user.service');

const registerUser = async (req, res, next) => {
    try {
        const result = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: result,
            message: 'resource created'
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const result = await userService.loginUser(req.body);

        res.status(200).json({
            success: true,
            data: {
                token: result.token,
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    user_name: result.user.user_name,
                    role: result.user.role,
                }
            },
            message: "User Logged In"
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const result = await userService.updateUserRole(req.body);
        res.status(200).json({
            success: true,
            data: result,
            message: "resource updated"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            data: result,
            message: "users fetched successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req.body.id);
        res.status(200).json({
            success: true,
            data: result,
            message: "user deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const getSummary = async (req, res, next) => {
    try {
        const result = await userService.getSummary(req.user.id);
        res.status(200).json({
            success: true,
            data: result,
            message: "summary fetched successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};
module.exports = {
    registerUser, loginUser, updateUserRole, getAllUsers, deleteUser, getSummary
}