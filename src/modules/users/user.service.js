const userRepository = require('./user.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const registerUser = async ({ user_name, email, password }) => {
    const isExistingUser = await userRepository.findUserByEmail(email);
    if (isExistingUser) {
        throw new Error("Email alreay exists!");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userRepository.registerUser({ user_name, email, password: hashedPassword });
    return {
        id: result.id,
        email: result.email,
        user_name: result.user_name,
        role: result.role
    }
};

const loginUser = async ({ email, password }) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("Invalid Credentials!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials!");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },

        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    )
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            user_name: user.user_name,
            role: user.role
        }
    };
}

const updateUserRole = async ({ id, role }) => {
    const user = await userRepository.updateUserRole(id, role);

    if (!user) {
        throw new Error("User does not exists!");
    }
    return {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role
    }
}

const getAllUsers = async () => {
    const users = await userRepository.getAllUsers();
    return users.map(user => ({
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        role: user.role
    }));
};

const deleteUser = async ({id}) => {
    const user = await userRepository.deleteUser(id);
    if(!user){
        throw new Error("User does not exists!");
    } 
    return {
        id: user.id,
        user_name: user.user_name,  
        email: user.email,
        role: user.role
    }
}

const getSummary = async () => {
    const result= await userRepository.getSummary();
    return {
        total_users: result.total_users,
        total_admins: result.total_admins,
        total_notes: result.total_notes
    };
};

module.exports = {
    registerUser, loginUser, updateUserRole, getAllUsers, deleteUser, getSummary
}