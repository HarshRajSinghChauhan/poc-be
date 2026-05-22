const { client } = require('../../config/db');

const registerUser = async ({ user_name, email, password }) => {
    const result = await client.query(
            `INSERT INTO users (user_name, email, password) Values ($1, $2, $3) RETURNING*`, [user_name, email, password]
        )
    return result.rows[0]
}

const findUserByEmail = async (email) =>{
    const result = await client.query(
        `SELECT * FROM users where email = ($1)`, [email]
    )
    return result.rows[0];
}

const updateUserRole = async (id, role) => {
    const result = await client.query(
        `Update users SET role = ($1) WHERE id = ($2) RETURNING *` , [role, id] 
    )
    return result.rows[0];
}

const getAllUsers = async () => {
    const result = await client.query(`SELECT * FROM users ORDER BY id ASC`);
    return result.rows;
}

const deleteUser = async (id) => {
    const result = await client.query(
        `DELETE FROM users WHERE id = ($1) RETURNING *`, [id]
    )
    return result.rows[0];
}
module.exports = {
    registerUser, findUserByEmail, updateUserRole, getAllUsers, deleteUser
} 
